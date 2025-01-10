import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");
  return !token ? element : <Navigate to="/home" replace />;
};

export default PublicRoute;
