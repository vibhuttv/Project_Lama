"use server";

async function signupAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  const data = { name, email, password };

  const rootUrl = process.env.ROOT_URL;
  if (!rootUrl) {
    console.error("ROOT_URL environment variable is not set.");
    return "Configuration error: ROOT_URL is missing";
  }

  console.log(`Sending signup request to: ${rootUrl}/api/signup`);

  try {
    const response = await fetch(`${rootUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Signup request failed:", response.statusText);
      return `Signup failed: ${response.statusText}`;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("An error occurred during signup:", error.message);
    return "An unexpected error occurred. Please try again later.";
  }
}

export default signupAction;
