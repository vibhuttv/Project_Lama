import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
  const cookie = request.cookies.get("Authorization");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const restrictedPaths = ["/"];

  if (!cookie) {
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    console.log("No Authorization cookie found.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log("JWT Payload: ", payload);

    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("JWT Verification failed:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/protected/:path*", "/"],
};
