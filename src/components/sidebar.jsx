import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/sidebar.scss";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    toggleSidebar();
    navigate(path);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <button onClick={() => handleNavigation("/home")}>Home</button>
          </li>
          <li>
            <button onClick={() => handleNavigation("/home/configuration")}>
              Configuration
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
