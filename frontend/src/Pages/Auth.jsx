// import React from "react";
import "./auth.scss";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Auth = () => {
	const [productId, setProductId] = useState("");
	const [orderId, setOrderId] = useState("");
	// const [message, setMessage] = useState("");
	const [isLoading, setIsloading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsloading(true);
		// Handle form submission logic here
		try {
			const response = await fetch(
				`${import.meta.env.VITE_APP_BACKEND_URL}/api/records`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ productId, orderId }),
				}
			);

			if (response.ok) {
				// const data = await response.json();
				// setMessage(data.message);
				// Generate a new user token (simulated)
				const userToken = generateUserToken();
				// Store the token in local storage
				console.log(userToken);
				localStorage.setItem("userToken", userToken);

				// setMessage("User token generated and stored successfully.");
				sessionStorage.setItem("productId", productId);
				sessionStorage.setItem("orderId", orderId);
				setIsloading(false);
				Swal.fire({
					title: "Successfully logged In",
					icon: "success",
					showClass: {
						popup: `animate__animated
								animate__fadeInUp
								animate__faster`,
					},
					hideClass: {
						popup: `
							animate__animated 
							animate__fadeOutDown 
							animate__faster
						`,
					},
				}).then((res) => {
					if (res.isConfirmed) {
						navigate("/home");
					}
				});
				// navigate("/home");
			} else {
				const errorData = await response.json();
				console.log(errorData);
				// setMessage(errorData.error || "Something went wrong");
			}
		} catch (error) {
			// setMessage("Error: " + error.message);
			console.log(error);
		}
		console.log(`Product ID: ${productId}, Order ID: ${orderId}`);
	};
	const generateUserToken = () => {
		// Simulate generating a user token (for demonstration purposes)
		return `${Math.random().toString(36).substr(2)}`;
	};
	return (
		<div className="auth-wrapper">
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
				{isLoading ? (
					<>
						<Oval
							visible={true}
							height="80"
							width="80"
							color="#4fa94d"
							ariaLabel="oval-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
					</>
				) : (
					<>
						<button className="submit-btn" type="submit">
							Submit
						</button>
					</>
				)}
			</form>
			{/* {message && <p>{message}</p>} */}
		</div>
	);
};

export default Auth;
