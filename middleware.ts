import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;

  const isAuthenticated = !!token;

  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/agenda", request.url));
  }

  if (pathname === "/register" && isAuthenticated) {
    return NextResponse.redirect(new URL("/agenda", request.url));
  }

  if (pathname === "/agenda" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
