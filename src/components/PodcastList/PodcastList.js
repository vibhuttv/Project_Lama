"use client";

import React from "react";
import styles from "./PodcastList.module.css";

const PodcastList = ({ podcasts }) => {
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
              <td>{new Date(podcast.creationDate).toLocaleString()}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    podcast.status === "DONE" ? styles.done : styles.inProgress
                  }`}
                >
                  {podcast.status === "DONE" ? "Done" : "In Progress"}
                </span>
              </td>
              <td>
                <button className={styles.viewButton}>View</button>
                <button className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PodcastList;
