// import React from 'react'
import { useState } from "react";
import "./address.scss";
const Address = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dist, setDist] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState();
  const [state, setState] = useState("");

  return (
    <>
      <h2>We need your information</h2>
      <div className="address-form-wrapper">
        <div className="sections">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sections">
          <span>Phone No</span>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="sections" id="address-section">
          <span>Address</span>
          <textarea
            id="reasonToReturn"
            value={address}
            cols={10}
            rows={5}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="sections">
          <span>District</span>
          <input
            type="text"
            value={dist}
            onChange={(e) => setDist(e.target.value)}
          />
        </div>
        <div className="sections">
          <span>City</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="sections">
          <span>Pin Code</span>
          <input
            type="number"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <div className="sections">
          <span>State</span>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button>Save</button>
        </div>
      </div>
    </>
  );
};

export default Address;
