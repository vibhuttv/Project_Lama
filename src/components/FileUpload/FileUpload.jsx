import React from "react";
import styles from "./FileUpload.module.css";
import { MdOutlineCloudUpload } from "react-icons/md";

const FileUpload = ({ onClick }) => {
  return (
    <div className={styles.uploadContainer}>
      <MdOutlineCloudUpload className={styles.uploadIcon} size={110} />
      <p className={styles.uploadText}>
        Select a file or drag and drop here (Podcast Media or Transcription
        Text)
      </p>
      <p className={styles.uploadFormats}>
        MP4, MOV, MP3, WAV, PDF, DOCX, or TXT file
      </p>
      <button className={styles.uploadButton} onClick={onClick}>
        Select File
      </button>
    </div>
  );
};

export default FileUpload;
