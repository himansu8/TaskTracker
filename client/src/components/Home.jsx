// Home.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar"
import "./home.css";
import Footer from "./footer/Footer";

function Home() {
  return (
    <>
    <Navbar />
    <div className="home-container">
      <div className="top-bar">
        <h1>Welcome To Himansu Task Tracker</h1>
        <br/>
      </div>
      <div className="logo-container">
        <img
          className="logo-image"
          src="https://asbtasktracker.com/wp-content/uploads/2022/01/tasktracker-logo-hor-green.png"
          alt="Task Tracker Logo"
        />
      </div>
    </div>
    <Footer/>
  </>
  );
}

export default Home;
