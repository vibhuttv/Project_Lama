"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("Authorization")?.value;

  if (!token) {
    return null;
  }

  // console.log("Token:", token);

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    console.log("Payload:", payload);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
