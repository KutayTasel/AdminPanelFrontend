import React from "react";
import "../assets/css/navbar.scss";
import adminIcon from "../assets/img/adminresim.png";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <button className="navbar-menu" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="menu-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div className="navbar-icon-container">
        <img src={adminIcon} alt="Admin Icon" className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
