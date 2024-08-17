import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
  const cookie = request.cookies.get("Authorization");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const restrictedPaths = [];
  const protectedPaths = ["/protected", "/projects"];
  const currentPath = request.nextUrl.pathname;

  const isRestricted = restrictedPaths.includes(currentPath);
  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (!cookie) {
    console.log("No Authorization cookie found.");
    if (isProtected || isRestricted) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const jwt = cookie.value;
  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log("JWT Payload: ", payload);

    if (isRestricted) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
    return NextResponse.next();
  } catch (err) {
    console.log("JWT Verification failed:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/projects", "/protected/:path*"],
};
