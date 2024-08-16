"use server";
// logoutAction.js
import { cookies } from "next/headers";

export default async function logoutAction() {
  const cookieStore = cookies();
  cookieStore.delete("Authorization");
}
