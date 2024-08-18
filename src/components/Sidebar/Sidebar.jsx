"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./side.module.css";
import Logo from "../../../public/logoP.svg";
import { FaPlus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { HiRectangleStack } from "react-icons/hi2";
import { TbDiamondsFilled } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const router = useRouter();
  useEffect(() => {
    console.log("Fetching user data...");
    const getDate = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userJson = await response.json();
        const userId = userJson.sub;
        console.log("User ID:", userId);

        const userResponse = await fetch(`/api/user/${userId}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch specific user");
        }
        const user = await userResponse.json();
        console.log("User:", user);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getDate();
  }, []);

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        <Image src={Logo} alt="Logo" width={190} height={40} />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <button className={styles.addPodcastBtnActive}>
            <FaPlus />
            <span> Add your Podcast(s)</span>
          </button>
        </li>
        <li>
          <span className={styles.navItem}>
            <button className={styles.addPodcastBtn}>
              <FaPen /> <span>Create & Repurpose</span>
            </button>
          </span>
        </li>
        <li>
          <span className={styles.navItem}>
            <button className={styles.addPodcastBtn}>
              <HiRectangleStack />
              <span>Podcast Widget</span>
            </button>
          </span>
        </li>
        <li>
          <span className={styles.navItem}>
            <button className={styles.addPodcastBtn}>
              <TbDiamondsFilled />
              <span>Upgrade</span>
            </button>
          </span>
        </li>
      </ul>
      <div className={styles.divider}></div>
      <div className={styles.bottomSection}>
        <div
          className={styles.helpSection}
          onClick={() => router.push("/user")}
        >
          <AiFillSetting />
          <span className={styles.navItem}>Help</span>
        </div>
        <div className={styles.divider}></div>
        <div
          className={styles.userProfile}
          onClick={() => router.push("/user")}
        >
          <Image
            src="/user.png"
            alt="Profile"
            width={46}
            height={46}
            className={styles.profilePic}
          />
          <div>
            <p>{userData.name}</p>
            <span>{userData.email}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
