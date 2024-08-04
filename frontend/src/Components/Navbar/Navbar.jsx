// src/Navbar.js
import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
    // Add  logout logic here
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <h1>App Name</h1>
      </div>
      <div className="navbar__right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
