"use client";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Popup from "@/components/Popup/Popup";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seen, setSeen] = useState(false);
  const [userId, setUserId] = useState(null);

  function togglePop() {
    setSeen(!seen);
  }

  const handleCreateProject = async (projectName) => {
    try {
      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName, userId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      try {
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await userResponse.json();
        setUserId(userData.sub);

        const projectResponse = await fetch("/api/project");
        if (!projectResponse.ok) {
          throw new Error("Failed to fetch projects");
        }
        let projectData = await projectResponse.json();
        console.log("Projects:", projectData);

        projectData = projectData.filter(
          (project) => project.userId === userData.sub
        );
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {projects.length === 0 ? (
          <div>
            <h1 className={styles.title}>Create a New Project</h1>
            <div className={styles.imageContainer}>
              <Image
                src="/projectHero.svg"
                alt="Project"
                width={400}
                height={400}
              />
            </div>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <button className={styles.button} onClick={togglePop}>
              <span className={styles.plusIcon}>
                <AiOutlinePlusCircle fill="white" size={35} />
              </span>{" "}
              Create New Project
            </button>
            <div>
              {seen ? (
                <Popup toggle={togglePop} onSubmit={handleCreateProject} />
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.buttonLogo}>
              <h1 className={styles.title}>Projects</h1>
              <button className={styles.button} onClick={togglePop}>
                <span className={styles.plusIcon}>
                  <AiOutlinePlusCircle fill="white" size={35} />
                </span>{" "}
                Create New Project
              </button>
            </div>

            <div className={styles.cardsContainer}>
              {projects.map((project) => (
                <div key={project._id} className={styles.card}>
                  <h2>{project.name}</h2>
                  {/* Add more project details here */}
                </div>
              ))}
            </div>
            {seen ? (
              <Popup toggle={togglePop} onSubmit={handleCreateProject} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
