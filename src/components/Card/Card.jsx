import React from "react";
import styles from "./card.module.css";

const Card = ({ project }) => {
  let initials = "";
  if (project.name && project.name.split(" ").length > 1) {
    initials = project.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  } else if (project.name) {
    initials = project.name.toUpperCase().slice(0, 2);
  }

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <span>{initials}</span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.projectName}>{project.name}</h2>
        <p className={styles.episodeCount}>
          {project.numberOfPodcasts || 0} Episodes
        </p>
        <p className={styles.lastEdited}>{project.updationDate}</p>
      </div>
    </div>
  );
};

export default Card;
