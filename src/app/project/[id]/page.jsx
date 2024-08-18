"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { MdUpload } from "react-icons/md";
import { FaRss, FaYoutube } from "react-icons/fa";
import styles from "./page.module.css";
import Tile from "@/components/Tile/Tile";
import FileUpload from "@/components/FileUpload/FileUpload";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import PodcastList from "@/components/PodcastList/PodcastList";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const Page = () => {
  const [projectName, setProjectName] = useState("Sample Project");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalLogo, setModalLogo] = useState(null);
  const [podcastName, setPodcastName] = useState("");
  const [podcastLink, setPodcastLink] = useState("");
  const [podcasts, setPodcasts] = useState([]);

  const projectId = useParams().id;

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }
        let userData = await userResponse.json();

        if (projectId) {
          const projectResponse = await fetch(`/api/project/${projectId}`);
          let projectData = await projectResponse.json();
          setProjectName(projectData.name);

          if (projectData.numberOfPodcasts > 0) {
            const podcastsResponse = await fetch(
              `/api/podcast?project=${projectId}`
            );
            const podcastsData = await podcastsResponse.json();
            setPodcasts(podcastsData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchUserAndProjects();
  }, [projectId]);

  const handleCreatePodcast = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await fetch("/api/user");
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user");
      }
      let userData = await userResponse.json();
      const userId = userData.sub;

      const response = await fetch("/api/podcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: podcastName,
          text: podcastLink,
          user: userId,
          project: projectId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create podcast");
      }

      const newPodcast = await response.json();
      console.log("New Podcast:", newPodcast);

      setPodcasts((prevPodcasts) => [...prevPodcasts, newPodcast.podcast]);

      const projectResponse = await fetch(
        `/api/project/${projectId}/incrementPodcastCount`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!projectResponse.ok) {
        throw new Error("Failed to update project's podcast count");
      }

      const updatedProject = await projectResponse.json();
      console.log("Updated Project:", updatedProject);

      closeModal();
    } catch (error) {
      console.error("Error creating podcast:", error);
    }
  };

  const handleDeletePodcast = async (podcastId) => {
    try {
      const response = await fetch(`/api/podcast/${podcastId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete podcast");
      }

      setPodcasts((prevPodcasts) =>
        prevPodcasts.filter((podcast) => podcast._id !== podcastId)
      );

      const projectResponse = await fetch(
        `/api/project/${projectId}/decrementPodcastCount`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!projectResponse.ok) {
        throw new Error("Failed to update project's podcast count");
      }

      const updatedProject = await projectResponse.json();
      console.log("Updated Project:", updatedProject);
    } catch (error) {
      console.error("Error deleting podcast:", error);
    }
  };

  const openModal = (title, logo) => {
    setModalTitle(title);
    setModalLogo(logo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPodcastName("");
    setPodcastLink("");
  };

  if (loading) {
    return (
      <div className={styles.center}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Add Podcast</h1>

      <div className={styles.cardsContainer}>
        <Tile
          title="RSS Feed"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<FaRss size={50} color="white" />}
          color={"#F78422"}
          onClick={() =>
            openModal(
              "Upload from RSS Feed",
              <FaRss size={30} color="#F78422" />
            )
          }
        />
        <Tile
          title="Youtube Video"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<FaYoutube size={50} color="white" />}
          color={"#FF0000"}
          onClick={() =>
            openModal(
              "Upload from Youtube",
              <FaYoutube size={30} color="red" />
            )
          }
        />
        <Tile
          title="Upload Files"
          description="Lorem ipsum dolor sit. Dolor lorem sit."
          icon={<MdUpload size={50} color="#7E22CE" />}
          color={"#F3E8FF"}
          onClick={() =>
            openModal("Upload Files", <MdUpload size={30} color="#7E22CE" />)
          }
        />
      </div>

      {podcasts.length === 0 && (
        <FileUpload
          onClick={() =>
            openModal("Upload Files", <MdUpload size={30} color="#7E22CE" />)
          }
        />
      )}

      {podcasts.length > 0 && (
        <PodcastList podcasts={podcasts} onDelete={handleDeletePodcast} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        logo={modalLogo}
      >
        <form onSubmit={handleCreatePodcast} className={styles.podcastForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={podcastName}
              onChange={(e) => setPodcastName(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link" className={styles.formLabel}>
              Transcript
            </label>
            <input
              type="text"
              name="link"
              value={podcastLink}
              onChange={(e) => setPodcastLink(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.formButton}>
            Upload
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Page;
