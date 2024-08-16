"use server";

async function signupAction(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("form data", { name, email, password: "***" });

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
  } catch (error) {
    console.error("An error occurred during signup:", error);
    return "An unexpected error occurred";
  }
}

export default signupAction;
