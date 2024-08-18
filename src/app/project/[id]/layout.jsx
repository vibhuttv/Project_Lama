"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  const [ownerId, setOwnerId] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, projectRes] = await Promise.all([
          fetch("/api/user"),
          fetch(`/api/project/${id}`),
        ]);

        if (!userRes.ok || !projectRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const userJson = await userRes.json();
        const projectJson = await projectRes.json();

        setCurrentUserId(userJson.sub);
        setOwnerId(projectJson.userId);
        setProjectName(projectJson.name);

        if (userJson.sub !== projectJson.userId) {
          console.log("User is not owner of project");
          router.push("/project");
        } else {
          console.log("User is owner of project");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

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
