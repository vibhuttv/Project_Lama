import React from "react";
import { FaHome } from "react-icons/fa";
import { AiOutlineNotification, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ projectName }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumb}>
        <FaHome className={styles.icon} />
        <Link href="/">
          <h1 className={styles.link}>Home Page</h1>
        </Link>
        <span className={styles.separator}>/</span>
        <span className={styles.projectName}>{projectName}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.addPodcast}>
          <Link href="/add-podcast">
            <h1>Add your podcast</h1>
          </Link>
        </span>
      </div>
      <div className={styles.actions}>
        <AiOutlineNotification className={styles.actionIcon} />
        <AiOutlineLogout className={styles.actionIcon} />
      </div>
    </div>
  );
};

export default Breadcrumb;
