// import React from 'react'
import { useState } from "react";

const ReasonAsking = () => {
	const [imageProduct, setImageProduct] = useState();
	const [preview, setPreview] = useState(null);
	const [reason, setReason] = useState();
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setImageProduct(file);

		// Create a preview of the image
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (imageProduct) {
			// Handle the file upload here
			console.log("File selected:", imageProduct);
		}
	};
	return (
		<>
			<h2>Why are you returning ?</h2>
			<div className="from-wrapper">
				<form className="return-form-one" onSubmit={handleSubmit}>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor="productImage">Image of Product</label>
						<br />
						<input
							type="file"
							id="productImage"
							onChange={handleFileChange}
							accept="image/*"
							required
						/>
					</div>
					<div style={{ marginBottom: "10px" }}>
						<label htmlFor="reasonToReturn">Reason for Returning</label>
						<br />
						<textarea
							id="reasonToReturn"
							value={reason}
							cols={10}
							rows={5}
							onChange={(e) => setReason(e.target.value)}
							required
						/>
					</div>
					<button className="submit-btn" type="submit">
						Submit
					</button>
				</form>
				<div className="preview-container">
					{preview && <img src={preview} alt="Image Preview" />}
				</div>
			</div>
		</>
	);
};

export default ReasonAsking;
