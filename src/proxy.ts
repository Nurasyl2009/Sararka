import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import createIntlMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const handleI18nRouting = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized", success: false },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden", success: false },
        { status: 403 }
      );
    }
  }



  // Next-intl middleware for public routes
  if (
    !pathname.startsWith("/api") && 
    !pathname.startsWith("/admin") && 
    !pathname.startsWith("/auth")
  ) {
    return handleI18nRouting(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
