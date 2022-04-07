import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.token;
  console.log(token);

  console.log(req.nextUrl.pathname);
  if (
    (req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register") &&
    token
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
}
