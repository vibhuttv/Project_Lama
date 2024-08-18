import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";
import { GrHomeRounded } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { GrNotification } from "react-icons/gr";

const Breadcrumb = ({ projectName }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.home}>
          <GrHomeRounded className={styles.icon} size={24} />
          <span>
            <h1 className={styles.link}>Home Page</h1>
          </span>
        </Link>
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
        <GrNotification size={45} className={styles.actionIcon} />
        <Link href="/" className={styles.home}>
          <FiLogOut size={45} className={styles.actionIcon} color="red" />
        </Link>
      </div>
    </div>
  );
};

export default Breadcrumb;
