import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWTPayload, Role } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromCookie(cookies: string | null): string | null {
  if (!cookies) return null;
  const match = cookies.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}

export function isAdmin(role: Role): boolean {
  return role === "ADMIN";
}
