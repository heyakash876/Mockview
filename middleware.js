import { NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

export default async function middleware(req) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/forum");
  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthRoute && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (e) {
      // Invalid session, allow access to auth routes
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};