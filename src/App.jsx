import React, { useState, useEffect } from "react";
import RouteComponents from "./components/seedworks/RouteComponents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div>
      <RouteComponents isAuthenticated={isAuthenticated} />
      <ToastContainer />
    </div>
  );
}

export default App;
