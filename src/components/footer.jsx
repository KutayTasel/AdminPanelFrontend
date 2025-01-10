import React from "react";
import "../assets/css/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Kutay Taşel</p>
      </div>
    </footer>
  );
};

export default Footer;
