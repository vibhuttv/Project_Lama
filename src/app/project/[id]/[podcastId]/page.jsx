"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

const PodcastDetailPage = () => {
  const { id, podcastId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDiscardClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Implement your save logic here
    setIsEditing(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Breadcrumb projectName={`Project ${id}`} />
      <h1 className={styles.heading}>
        <div className={styles.leftSection}>
          <Link href={`/project/${id}`}>
            <IoArrowBack className={styles.backicon} color="black" size={50} />
          </Link>
          <h1>Edit Transcript</h1>
        </div>
        {!isEditing && (
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
        )}
        {isEditing && (
          <div className={styles.buttonContainer}>
            <button
              className={styles.discardButton}
              onClick={handleDiscardClick}
            >
              Discard
            </button>
            <button className={styles.saveButton} onClick={handleSaveClick}>
              Save
            </button>
          </div>
        )}
      </h1>

      <div className={styles.transcriptContainer}>
        <div className={styles.transcriptContent}>
          <h3 className={styles.speaker}>Speaker</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Donec non felis nec nulla suscipit ultrices. Nulla
            facilisi. Donec non felis nec nulla suscipit ultrices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailPage;
