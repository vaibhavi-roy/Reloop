// import React from "react";
import "./auth.scss";
import React, { useState } from "react";

const Auth = () => {
  const [productId, setProductId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await fetch("http://localhost:5000/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, orderId }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
    console.log(`Product ID: ${productId}, Order ID: ${orderId}`);
  };
  return (
    <div>
      <h2>Reverse Logistics Platform</h2>
      <form className="entry-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="productId">Product ID:</label>
          <br />
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="orderId">Order ID:</label>
          <br />
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
