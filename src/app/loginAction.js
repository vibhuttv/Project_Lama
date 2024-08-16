"use server";

import { cookies } from "next/headers";

async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("form data", { email, password: "***" });

  const data = { email, password };
  console.log(process.env.ROOT_URL + "/api/login");

  try {
    const response = await fetch(process.env.ROOT_URL + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      cookies().set("Authorization", json.token, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        path: "/",
        sameSite: "strict",
      });
    } else {
      return json.message || "An error occurred during login";
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    return "An unexpected error occurred";
  }
}

export default loginAction;
