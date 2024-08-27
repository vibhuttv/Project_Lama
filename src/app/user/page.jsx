"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import logoutAction from "../../actions/logoutAction";
import { toast, Toaster } from "react-hot-toast";

const AccountSettingsPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const userId = data.sub;
        const userData = await fetch(`/api/user/${userId}`);
        const user = await userData.json();

        setUserData({ name: user.name, email: user.email });
      } catch (error) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newUser = { ...userData, [name]: value };
    setUserData(newUser);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      toast.success("User data updated successfully!");
    } catch (error) {
      setError("Failed to update user data");
      toast.error("Failed to update user data");
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={styles.center}>
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <IoArrowBack
            className={styles.backicon}
            color="black"
            size={40}
            onClick={() => router.push("/project")}
          />
          <h1 className={styles.heading}>Account Settings</h1>
        </div>
        <div className={styles.profileSection}>
          <Image
            className={styles.profileImage}
            src="/user.png"
            alt="Profile"
            height={200}
            width={200}
          />
          <div className={styles.formGroup}>
            <label className={styles.label}>User Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className={styles.input}
              disabled
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleSave} className={styles.saveButton}>
              Save
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>
        <div className={styles.subscriptionSection}>
          <h2 className={styles.subHeading}>Subscriptions</h2>
          <div className={styles.subscriptionBox}>
            <p className={styles.noActivePlans}>
              Oops! You don’t have any active plans.{" "}
              <span className={styles.upgradeLink}>Upgrade now!</span>
            </p>
            <button className={styles.upgradeButton}>Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
