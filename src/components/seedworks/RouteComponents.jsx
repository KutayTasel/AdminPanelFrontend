import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Configuration from "../../pages/Configuration";
import PrivateRoute from "../../components/seedworks/PrivateRouter";
import PublicRoute from "../../components/seedworks/PublicRouter";

const RouteComponents = () => {
  return (
    <Routes>
      <Route
        path="/register"
        element={<PublicRoute element={<Register />} />}
      />
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />}>
        <Route path="configuration" element={<Configuration />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default RouteComponents;
