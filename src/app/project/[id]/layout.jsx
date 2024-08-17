"use client";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useParams } from "next/navigation";
import React from "react";

const Layout = () => {
  const { id } = useParams();
  console.log("id: " + id);

  return (
    <div>
      <div className="container">
        <Sidebar />
      </div>
      <Breadcrumb projectName={id} />
    </div>
  );
};

export default Layout;
