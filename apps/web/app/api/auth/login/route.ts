import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isMongoDBConfigured } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/User";
import { verifyPassword, signAuthToken } from "@/lib/auth";
import { store, DEFAULT_USERS } from "@/lib/store";
import { UserProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email: string; password?: string };

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    let authenticatedUser: UserProfile | null = null;

    if (isMongoDBConfigured()) {
      await connectToDatabase();
      const userDoc = await UserModel.findOne({ email: normalizedEmail });

      if (userDoc) {
        if (password) {
          const isMatch = await verifyPassword(password, userDoc.passwordHash);
          if (!isMatch) {
            return NextResponse.json(
              { error: "Invalid email or password." },
              { status: 401 }
            );
          }
        }
        authenticatedUser = {
          id: userDoc._id.toString(),
          name: userDoc.name,
          email: userDoc.email,
          role: userDoc.role,
          rollNumber: userDoc.rollNumber,
          targetYear: userDoc.targetYear
        };
      }
    }

    // Fallback check against memory store
    if (!authenticatedUser) {
      const memUser = store.getUserByEmail(normalizedEmail);
      if (memUser) {
        authenticatedUser = memUser;
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: "Account not found. Please register first." },
        { status: 404 }
      );
    }

    // Sign JWT Auth Token
    const token = signAuthToken({
      userId: authenticatedUser.id,
      email: authenticatedUser.email,
      name: authenticatedUser.name,
      role: authenticatedUser.role,
      rollNumber: authenticatedUser.rollNumber,
      targetYear: authenticatedUser.targetYear
    });

    const res = NextResponse.json({
      success: true,
      user: authenticatedUser,
      token,
      message: `Welcome back, ${authenticatedUser.name}!`
    });

    // Set secure HTTP-only cookie
    res.cookies.set({
      name: "love_neet_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax"
    });

    return res;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to authenticate." },
      { status: 500 }
    );
  }
}
