"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";

import Image from "next/image";
import Link from "next/link";

import { AiOutlinePlusCircle } from "react-icons/ai";

import Navbar from "@/components/Navbar/Navbar";
import Popup from "@/components/Popup/Popup";
import Card from "@/components/Card/Card";

import useProjectStore from "@/hooks/useProjectStore";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const Page = () => {
  const {
    projects,
    loading,
    seen,
    userId,
    setProjects,
    setUserId,
    setLoading,
    togglePop,
    addProject,
  } = useProjectStore();

  const handleCreateProject = async (projectName) => {
    try {
      const user = await fetch("/api/user")
        .then((res) => res.json())
        .then((data) => data.sub);
      setUserId(user);
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
      console.log("New Project:", newProject);
      addProject(newProject.project);
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
  }, [setUserId, setProjects, setLoading]);

  if (true) {
    return (
      <div className={styles.center}>
        <LoadingSpinner />
      </div>
    );
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
                <Link
                  key={project._id}
                  href={`/project/${project._id}`}
                  className={styles.nounderline}
                >
                  <nav>
                    <Card project={project} />
                  </nav>
                </Link>
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
