// import React from 'react'
// import { useState } from "react";
import "./return.scss";
import ReasonAsking from "../Components/ReturnExchange/ReasonAsking";
import Address from "../Components/ReturnExchange/Address";
import Method from "../Components/ReturnExchange/Method";
import { useEffect, useState } from "react";
import { return_req } from "../Services/api.returnExchange";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const Return = () => {
	const [pageNumber, setPageNumber] = useState(0);
	// const [imageProduct, setImageProduct] = useState(null);
	// const [preview, setPreview] = useState(null);
	// const [reason, setReason] = useState();
	// const handleFileChange = (event) => {
	// 	const file = event.target.files[0];
	// 	setImageProduct(file);

	// 	// Create a preview of the image
	// 	const reader = new FileReader();
	// 	reader.onloadend = () => {
	// 		setPreview(reader.result);
	// 	};
	// 	if (file) {
	// 		reader.readAsDataURL(file);
	// 	}
	// };

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	if (imageProduct) {
	// 		// Handle the file upload here
	// 		console.log("File selected:", imageProduct);
	// 	}
	// };
	useEffect(() => {});
	return (
		// <div className="return-page-wrapper">

		// 	<h2>Why are you returning ?</h2>
		// 	<div className="from-wrapper">
		// 		<form className="return-form-one" onSubmit={handleSubmit}>
		// 			<div style={{ marginBottom: "10px" }}>
		// 				<label htmlFor="productImage">Image of Product</label>
		// 				<br />
		// 				<input
		// 					type="file"
		// 					id="productImage"
		// 					onChange={handleFileChange}
		// 					accept="image/*"
		// 					required
		// 				/>
		// 			</div>
		// 			<div style={{ marginBottom: "10px" }}>
		// 				<label htmlFor="reasonToReturn">Reason for Returning</label>
		// 				<br />
		// 				<textarea
		// 					id="reasonToReturn"
		// 					value={reason}
		// 					cols={10}
		// 					rows={5}
		// 					onChange={(e) => setReason(e.target.value)}
		// 					required
		// 				/>
		// 			</div>
		// 			<button className="submit-btn" type="submit">
		// 				Submit
		// 			</button>
		// 		</form>
		// 		<div className="preview-container">
		// 			{preview && <img src={preview} alt="Image Preview" />}
		// 		</div>
		// 	</div>
		// </div>
		<div className="return-page-wrapper">
			{pageNumber === 0 && <ReasonAsking />}
			{pageNumber === 1 && <Address />}
			{pageNumber === 2 && <Method />}
			<div className="main-btn-conatiner">
				{pageNumber > 0 && pageNumber < 3 && (
					<button
						className="submit-btn"
						onClick={() => setPageNumber(pageNumber - 1)}>
						back
					</button>
				)}
				{pageNumber < 2 && pageNumber > -1 && (
					<button
						className="submit-btn"
						onClick={() => setPageNumber(pageNumber + 1)}>
						Continue
					</button>
				)}
				{/* {pageNumber === 2 && (
					<button className="submit-btn" onClick={applyReturn}>
						Apply
					</button>
				)} */}
			</div>
		</div>
	);
};

export const applyReturn = async () => {
	const data = {
		productId: sessionStorage.getItem("productId"),
		orderId: sessionStorage.getItem("orderId"),
		email: sessionStorage.getItem("email"),
		phone_number: sessionStorage.getItem("phone_number"),
		image_link: sessionStorage.getItem("imageUrl"),
		reason: sessionStorage.getItem("reason"),
		method: sessionStorage.getItem("method"),
		address: {
			address: sessionStorage.getItem("address"),
			city: sessionStorage.getItem("city"),
			state: sessionStorage.getItem("state"),
			pincode: sessionStorage.getItem("pincode"),
			district: sessionStorage.getItem("district"),
		},
	};

	try {
		const res = await return_req(data);
		console.log(res);
		Swal.fire({
			title: "Request Submitted",
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
		});
		sessionStorage.clear();
		sessionStorage.setItem("type", "return");
	} catch (error) {
		console.log(error);
	}
};
export default Return;
