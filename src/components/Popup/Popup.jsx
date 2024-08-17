import React, { useState } from "react";
import styles from "./Popup.module.css";

const Popup = ({ toggle, onSubmit }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() === "") {
      setError("Project Name Can't be empty");
    } else {
      onSubmit(projectName);
      setProjectName("");
      toggle();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Create Project</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="projectName" className={styles.label}>
            Enter Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Type here"
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={toggle}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.createButton}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
