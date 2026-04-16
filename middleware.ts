import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "xr-auth";

// Tokens issued on successful login — one per user
const VALID_TOKENS = new Set([
  "xr-xenreality-2025",
  "xr-harshitha-2025",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the login page and Next.js internals
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (token && VALID_TOKENS.has(token)) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
