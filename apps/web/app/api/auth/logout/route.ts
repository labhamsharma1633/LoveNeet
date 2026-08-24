import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully."
  });

  res.cookies.set({
    name: "love_neet_token",
    value: "",
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    maxAge: 0
  });

  return res;
}
