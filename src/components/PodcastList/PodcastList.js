"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./PodcastList.module.css";
import formatDateTime from "@/lib/formatDateTime";

const PodcastList = ({ podcasts, onDelete }) => {
  const router = useRouter();

  const handleView = (podcastId, projectId) => {
    router.push(`/project/${projectId}/${podcastId}`);
  };

  return (
    <div className={styles.podcastListContainer}>
      <h2>Your Files</h2>
      <table className={styles.podcastTable}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Upload Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {podcasts.map((podcast, index) => (
            <tr key={podcast._id}>
              <td>{index + 1}</td>
              <td>{podcast.name}</td>
              <td>{formatDateTime(podcast.updationDate)}</td>
              <td>
                <span className={styles.status}>{podcast.status}</span>
              </td>
              <td className={styles.actionButtons}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleView(podcast._id, podcast.project)}
                >
                  View
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDelete(podcast._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PodcastList;
