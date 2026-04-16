import { NextRequest, NextResponse } from "next/server";

const VALID_USERS: Record<string, string> = {
  // username : password
  "xenreality": "xen@2025",
  "harshitha":  "xen@2025",
};

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Basic ")) {
    const base64 = authHeader.slice("Basic ".length);
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");

    if (VALID_USERS[username] && VALID_USERS[username] === password) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="XenReality — Private"',
    },
  });
}

export const config = {
  // Protect every route except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
