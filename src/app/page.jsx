"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import loginAction from "./loginAction";
import signupAction from "./signupAction";
import styles from "./page.module.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      if (isLogin) {
        // Handle login
        const result = await loginAction(formData);
        if (result && typeof result === "string") {
          setError(result);
          toast.error(result);
        } else {
          toast.success("Login successful!");
          router.push("/protected");
        }
      } else {
        // Handle signup
        const result = await signupAction(formData);
        if (typeof result === "string") {
          setError(result);
          toast.error(result);
        } else {
          toast.success("Signup successful!");
          setIsLogin(true);
          router.push("/");
        }
      }
    } catch (err) {
      console.error(err);
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <main className={styles.main}>
      <Toaster />
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
            {!isLogin && (
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className={styles.input}
              />
            )}
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
            {isLogin && (
              <div className={styles.forgot}>
                <a href="#" className={styles.forgotPassword}>
                  Forgot password?
                </a>
              </div>
            )}
            <button className={styles.loginBtn} type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className={styles.orDivider}>
            <span>or</span>
          </div>
          <p className={styles.createAccount}>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>
                  Create Account
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>
                  Login
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
