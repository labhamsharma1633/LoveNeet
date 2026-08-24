import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { connectToDatabase, isMongoDBConfigured } from "@/lib/mongodb";
import { UserModel } from "@/lib/models/User";
import { store } from "@/lib/store";

export async function GET(req: NextRequest) {
  try {
    const session = getAuthSession(req);

    if (!session) {
      return NextResponse.json(
        { user: null, authenticated: false },
        { status: 200 }
      );
    }

    if (isMongoDBConfigured()) {
      await connectToDatabase();
      const userDoc = await UserModel.findById(session.userId).select("-passwordHash");
      if (userDoc) {
        return NextResponse.json({
          authenticated: true,
          user: {
            id: userDoc._id.toString(),
            name: userDoc.name,
            email: userDoc.email,
            role: userDoc.role,
            rollNumber: userDoc.rollNumber,
            targetYear: userDoc.targetYear
          }
        });
      }
    }

    // Fallback to session data
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
        rollNumber: session.rollNumber,
        targetYear: session.targetYear
      }
    });
  } catch (err: any) {
    console.error("Auth session check error:", err);
    return NextResponse.json(
      { user: null, authenticated: false, error: err.message },
      { status: 500 }
    );
  }
}
