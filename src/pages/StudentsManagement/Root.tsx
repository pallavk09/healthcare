// import { lazy } from "react";
import React from "react";
import { Outlet } from "react-router-dom";

const StudentManagementRoot: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default StudentManagementRoot;
