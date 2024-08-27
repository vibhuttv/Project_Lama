import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
  const cookie = request.cookies.get("Authorization");
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET environment variable is not set.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedPaths = ["/user", "/project", "/"];
  const restrictedPaths = [];
  const currentPath = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isRestricted = restrictedPaths.includes(currentPath);

  if (!cookie) {
    console.log("No Authorization cookie found.");
    if (isProtected && currentPath !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const jwt = cookie?.value;

  try {
    const { payload } = await jose.jwtVerify(
      jwt,
      new TextEncoder().encode(secret)
    );
    console.log("JWT Payload: ", payload);

    if (currentPath === "/") {
      return NextResponse.redirect(new URL("/project", request.url));
    }

    if (isRestricted) {
      return NextResponse.redirect(new URL("/project", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT Verification failed:", err.message);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/project/:path*", "/user/:path*"],
};
