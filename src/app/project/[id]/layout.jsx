"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";
const Layout = ({ children }) => {
  return (
    <div>
      <div className={styles.container}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
