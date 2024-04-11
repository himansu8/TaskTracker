// Footer.js
import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2024 Himansu Task Tracker. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
