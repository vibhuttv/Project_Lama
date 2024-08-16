"use client";

import React from "react";
import logoutAction from "./logoutAction";
import { useRouter } from "next/navigation";

export default function Protected() {
  const router = useRouter();

  const handleLogout = () => {
    logoutAction();
    router.push("/");
  };

  return (
    <div>
      <h1>Protected</h1>
      <p>This is a protected page.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
