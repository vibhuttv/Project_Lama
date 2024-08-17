import React, { useState } from "react";
import styles from "./Popup.module.css";

const Popup = ({ toggle, onSubmit }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit(projectName);

    setProjectName("");
    toggle();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={toggle}>
          &times;
        </span>
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <button type="submit">Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
