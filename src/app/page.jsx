"use client";

import React, { useState } from "react";
import loginAction from "./loginAction";

export default function Home() {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const result = await loginAction(formData);
      if (result && typeof result === "string") {
        setError(result);
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
