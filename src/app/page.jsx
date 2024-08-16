"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import loginAction from "./loginAction";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const result = await loginAction(formData);
      if (result && typeof result === "string") {
        setError(result);
      } else {
        router.push("/protected");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.contentSection}>
        <Image
          src="/logo.svg"
          alt="Ques.AI logo"
          width={300}
          height={60}
          className={styles.logo}
        />
        <h1 className={styles.title}>
          Your podcast
          <br />
          will no longer
          <br />
          be just a hobby.
        </h1>
        <p className={styles.subtitle}>
          Supercharge Your Distribution
          <br />
          using our AI assistant!
        </p>
        <Image src="/spring.svg" alt="Ques.AI logo" fill />
      </div>
      <div className={styles.loginSection}>
        <div className={styles.loginContainer}>
          <Image
            src="/onlylogo.svg"
            alt="Ques.AI logo"
            width={100}
            height={100}
          />
          <h2 className={styles.welcomeText}>
            Welcome to <br />
            <span> Ques.AI </span>
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className={styles.input}
            />
            <div className={styles.forgot}>
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>
            <button className={styles.loginBtn} type="submit">
              Login
            </button>
          </form>
          <div className={styles.orDivider}>
            <span>or</span>
          </div>
          <p className={styles.createAccount}>
            Don't have an account? <a href="#">Create Account</a>
          </p>
        </div>
      </div>
    </main>
  );
}
