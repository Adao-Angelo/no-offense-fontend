"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middleware(req: NextRequest) {
  const cookie = cookies();
  const token = cookie.get("token");

  const protectedRoutes = ["/"];

  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (token && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
