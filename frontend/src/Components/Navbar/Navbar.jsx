// src/Navbar.js
import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("userToken");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <h1>Reloop</h1>
      </div>
      <div className="navbar__right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
