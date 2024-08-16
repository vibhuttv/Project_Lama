"use client";

import React, { useState } from "react";
import signupAction from "./signupAction";
import { useRouter } from "next/navigation";

const Page = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const result = await signupAction(formData);
      if (typeof result === "string") {
        setError(result);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div>
      <div>SignUP</div>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">SignUP</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Page;
