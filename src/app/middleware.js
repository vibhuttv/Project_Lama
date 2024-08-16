import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
  console.log("Incoming request: ", request);

  const cookie = cookies().get("Authorization");
  if (!cookie) {
    console.log("No Authorization cookie found.");
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log("JWT Payload: ", payload);
  } catch (err) {
    console.log("JWT Verification failed:", err);
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: "/protected/:path*",
};
