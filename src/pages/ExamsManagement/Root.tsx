// import { lazy } from "react";
import React from "react";
import { Outlet } from "react-router-dom";

const ExamsManagementRoot: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ExamsManagementRoot;
