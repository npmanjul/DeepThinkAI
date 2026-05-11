import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const protectedRoutes = ["/blog", "/profile","/private-blog"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/blog/:path*", "/profile/:path*", "/private-blog/:path*"],
};