import { NextRequest, NextResponse } from "next/server";
import { store, DEFAULT_USERS } from "@/lib/store";
import { UserProfile, UserRole } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (email) {
    const user = store.getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  }

  return NextResponse.json({ users: store.getUsers() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, name, role } = body;

    if (action === "login") {
      let user = store.getUserByEmail(email);
      if (!user) {
        // Auto-provision demo if matching default emails
        const demoUser = DEFAULT_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (demoUser) {
          user = store.createUser(demoUser);
        } else {
          return NextResponse.json(
            { error: "Account with this email does not exist. Please register." },
            { status: 401 }
          );
        }
      }
      return NextResponse.json({ success: true, user });
    }

    if (action === "register") {
      if (!email || !name) {
        return NextResponse.json(
          { error: "Email and Name are required" },
          { status: 400 }
        );
      }

      const existing = store.getUserByEmail(email);
      if (existing) {
        return NextResponse.json(
          { error: "User already exists with this email" },
          { status: 409 }
        );
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: (role as UserRole) || "candidate",
        targetYear: 2026,
        rollNumber: `NEET2026-${Math.floor(100000 + Math.random() * 900000)}`
      };

      store.createUser(newUser);
      return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Auth error" }, { status: 500 });
  }
}
