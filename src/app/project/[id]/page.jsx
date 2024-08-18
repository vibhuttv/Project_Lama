"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import {
  AiOutlineUpload,
  AiOutlineYoutube,
  AiOutlineFile,
} from "react-icons/ai";
import { FaRss } from "react-icons/fa";
import useProjectStore from "@/hooks/useProjectStore";
import styles from "./page.module.css";

const Page = () => {
  const [projectName, setProjectName] = useState("Sample Project");

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }

        // Here you would fetch the project based on the user or other criteria
        // For now, we'll just use a static name or you can set the project name from response
        setProjectName("Sample Project");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserAndProjects();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Breadcrumb projectName={projectName} />
      <h1 className={styles.heading}>Add Podcast</h1>

      {/* <div className={styles.cardsContainer}>
        <Card
          title="RSS Feed"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<FaRss size={50} color="#ff6600" />}
        />
        <Card
          title="Youtube Video"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<AiOutlineYoutube size={50} color="#ff0000" />}
        />
        <Card
          title="Upload Files"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<AiOutlineUpload size={50} color="#8a2be2" />}
        />
      </div>

      <FileUpload /> */}
    </div>
  );
};

export default Page;
