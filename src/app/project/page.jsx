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

  function togglePop() {
    setSeen(!seen);
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/project");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
            <button className={styles.button}>
              <span className={styles.plusIcon}>
                <AiOutlinePlusCircle fill="white" size={35} />
              </span>{" "}
              Create New Project
            </button>
            <div>
              <button onClick={togglePop}>Login</button>
              {seen ? <Popup toggle={togglePop} /> : null}
            </div>
          </div>
        ) : (
          <div>
            <h1 className={styles.title}>Your Projects</h1>
            <div className={styles.cardsContainer}>
              {projects.map((project) => (
                <div key={project._id} className={styles.card}>
                  <h2>{project.name}</h2>
                  {/* Add more project details here */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
