import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, isMongoDBConfigured } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/User";
import { hashPassword, signAuthToken } from "@/lib/auth";
import { store } from "@/lib/store";
import { UserProfile, UserRole } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role = "candidate", targetYear = 2026 } = body as {
      name: string;
      email: string;
      password: string;
      role?: UserRole;
      targetYear?: number;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const passwordHash = await hashPassword(password);
    const rollNumber =
      role === "admin"
        ? `FACULTY-NEET-${Math.floor(1000 + Math.random() * 9000)}`
        : `NEET2026-${Math.floor(100000 + Math.random() * 900000)}`;

    let createdUser: UserProfile;

    // Check if MongoDB is configured
    if (isMongoDBConfigured()) {
      await connectToDatabase();
      const existing = await UserModel.findOne({ email: normalizedEmail });
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email address already exists." },
          { status: 409 }
        );
      }

      const doc = await UserModel.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role,
        rollNumber,
        targetYear
      });

      createdUser = {
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        role: doc.role as UserRole,
        rollNumber: doc.rollNumber,
        targetYear: doc.targetYear
      };
    } else {
      // In-Memory Fallback
      const existing = store.getUserByEmail(normalizedEmail);
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email address already exists." },
          { status: 409 }
        );
      }

      const newId = `user-${Date.now()}`;
      createdUser = {
        id: newId,
        name: name.trim(),
        email: normalizedEmail,
        role,
        rollNumber,
        targetYear
      };
      store.createUser(createdUser);
    }

    // Sign JWT Auth Token
    const token = signAuthToken({
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      rollNumber: createdUser.rollNumber,
      targetYear: createdUser.targetYear
    });

    const res = NextResponse.json({
      success: true,
      user: createdUser,
      token,
      message: `Account created successfully as ${role}.`
    });

    // Set secure HTTP-only cookie
    res.cookies.set({
      name: "love_neet_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax"
    });

    return res;
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create account." },
      { status: 500 }
    );
  }
}
