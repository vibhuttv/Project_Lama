"use client";
import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const PodcastDetailPage = () => {
  const { id, podcastId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [originalText, setOriginalText] = useState(transcriptText);
  const [podcastName, setPodcastName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDiscardClick = () => {
    setTranscriptText(originalText);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/podcast/${podcastId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: transcriptText }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the transcript");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving transcript:", error);
    }
  };

  const handleTextChange = (e) => {
    setTranscriptText(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const fetchTranscript = async () => {
      console.log("fetching transcript");
      try {
        const response = await fetch(`/api/podcast/${podcastId}`);
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Failed to fetch the transcript");
        }
        const data = await response.json();

        console.log("data", data.podcast);
        setPodcastName(data.podcast.name);
        setTranscriptText(data.podcast.text);
        setOriginalText(data.podcast.text);

        console.log("transcript fetched " + data.podcast.text);
      } catch (error) {
        console.error("Error fetching transcript:", error);
      }
    };

    fetchTranscript();
    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div className={styles.center}>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className={styles.pageContainer}>
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
          <h3 className={styles.speaker}>{podcastName}</h3>
          {isEditing ? (
            <textarea
              className={styles.textarea}
              value={transcriptText}
              onChange={handleTextChange}
            />
          ) : (
            <p>{transcriptText}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailPage;
