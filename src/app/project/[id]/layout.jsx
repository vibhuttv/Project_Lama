"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
const Layout = ({ children }) => {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`/api/project/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setProjectName(data.name);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchProjectData();
    setLoading(false);
  });
  if (loading) {
    return <div className={styles.center}></div>;
  }
  return (
    <div>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <Breadcrumb projectName={projectName} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
