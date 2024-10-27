"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const cookie = cookies();
  const token = cookie.get("token");

  const protectedRoutes = ["/", "/users"];

  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/*", "/users/*"],
};
