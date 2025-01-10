import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import "../assets/css/home.scss";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className={`home-container flex flex-col min-h-screen ${
        isSidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-grow relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="content-container flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
