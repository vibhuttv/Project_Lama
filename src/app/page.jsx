"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation
import loginAction from "./loginAction";

export default function Home() {
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const result = await loginAction(formData);
      if (result && typeof result === "string") {
        setError(result);
      } else {
        router.push("/protected"); // Redirect after successful login
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
