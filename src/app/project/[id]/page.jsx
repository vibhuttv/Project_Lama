"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { MdUpload } from "react-icons/md";
import { FaRss, FaYoutube } from "react-icons/fa";
import styles from "./page.module.css";
import Tile from "@/components/Tile/Tile";
import FileUpload from "@/components/FileUpload/FileUpload";
import { useParams } from "next/navigation";

const Page = () => {
  const [projectName, setProjectName] = useState("Sample Project");
  const [loading, setLoading] = useState(true);

  const projectId = useParams().id;
  console.log("Project ID:", projectId);

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }
        let userData = await userResponse.json();

        if (projectId) {
          const projectResponse = await fetch(`/api/project/${projectId}`);
          let projectData = await projectResponse.json();
          console.log("Projects:", projectData);

          setProjectName(projectData.name);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    };

    fetchUserAndProjects();
  }, [projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <Breadcrumb projectName={projectName} />
      <h1 className={styles.heading}>Add Podcast</h1>

      <div className={styles.cardsContainer}>
        <Tile
          title="RSS Feed"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<FaRss size={50} color="white" />}
          color={"#F78422"}
        />
        <Tile
          title="Youtube Video"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<FaYoutube size={50} color="white" />}
          color={"#FF0000"}
        />
        <Tile
          title="Upload Files"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<MdUpload size={50} color="#7E22CE" />}
          color={"#F3E8FF"}
        />
      </div>

      <FileUpload />
    </div>
  );
};

export default Page;
