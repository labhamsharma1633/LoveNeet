import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { UserProfile, UserRole } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "love_neet_super_secure_jwt_secret_key_2026";
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  rollNumber?: string;
  targetYear?: number;
}

/**
 * Hash a plain text password with bcrypt salt rounds = 10
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain text password against a bcrypt hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Signs a secure JSON Web Token
 */
export function signAuthToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JSON Web Token
 */
export function verifyAuthToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Extracts and verifies auth session from NextRequest cookies or Authorization header
 */
export function getAuthSession(req: NextRequest): JWTPayload | null {
  // 1. Try reading HTTP-Only cookie
  const tokenFromCookie = req.cookies.get("love_neet_token")?.value;
  if (tokenFromCookie) {
    const payload = verifyAuthToken(tokenFromCookie);
    if (payload) return payload;
  }

  // 2. Try reading Authorization: Bearer <token> header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    return verifyAuthToken(token);
  }

  return null;
}

/**
 * Role-Based Access Control (RBAC) guard helper
 */
export function requireAuth(req: NextRequest, allowedRoles?: UserRole[]): {
  authenticated: boolean;
  user?: JWTPayload;
  errorResponse?: { error: string; status: number };
} {
  const user = getAuthSession(req);

  if (!user) {
    return {
      authenticated: false,
      errorResponse: { error: "Authentication required. Please sign in.", status: 401 }
    };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return {
      authenticated: false,
      errorResponse: { error: `Forbidden. Only ${allowedRoles.join(" or ")} accounts can access this resource.`, status: 403 }
    };
  }

  return {
    authenticated: true,
    user
  };
}
