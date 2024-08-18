import React from "react";
import { AiOutlineNotification, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";
import { GrHomeRounded } from "react-icons/gr";

const Breadcrumb = ({ projectName }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumb}>
        <GrHomeRounded className={styles.icon} size={24} />
        <span>
          <h1 className={styles.link}>Home Page</h1>
        </span>
        <span className={styles.separator}>/</span>
        <span className={styles.link}>
          <h1>{projectName}</h1>
        </span>
        <span className={styles.separator}>/</span>
        <span className={styles.addPodcast}>
          <h1>Add your podcast</h1>
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
