import React from "react";
import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, logo, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {logo}
            <h2>{title}</h2>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <IoClose size={30} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
