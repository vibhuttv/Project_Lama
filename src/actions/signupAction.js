"use server";

async function signupAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("form data", { name, email, password: "***" });

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  const data = { name, email, password };
  console.log(process.env.ROOT_URL + "/api/signup");

  try {
    const response = await fetch(process.env.ROOT_URL + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("An error occurred during signup:", error);
    return "An unexpected error occurred";
  }
}

export default signupAction;
