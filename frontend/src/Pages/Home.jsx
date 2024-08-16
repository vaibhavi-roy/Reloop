// import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./home.scss";
import heroImg from "../assets/hero.png";
import trackerImg from "../assets/tracker.jpg";
import exchangeImg from "../assets/exchange.jpg";
import returnImg from "../assets/return.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="header">
        <h3>
          {" "}
          Welcome to Reloop, designed to streamline and optimize the process of
          managing product returns, exchanges, and product timelines. Our
          platform provides seamless integration with the admin side, ensuring
          efficient handling of reverse logistics operations.
        </h3>
      </div>
      <img className="hero-img" src={heroImg} alt=" " />
      <div className="btn-con">
        <div className="buttons">
          <img src={trackerImg}></img>
          <h2>Check your product status</h2>
          <button className="home-btn" onClick={() => navigate("/tracker")}>
            Tracker
          </button>
        </div>
        <div className="buttons">
          <img src={returnImg}></img>
          <h2>Return & Refund</h2>
          <button className="home-btn" onClick={() => navigate("/return")}>
            Return
          </button>
        </div>
        <div className="buttons">
          <img src={exchangeImg}></img>
          <h2>Replace your product</h2>
          <button className="home-btn" onClick={() => navigate("/exchange")}>
            Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
