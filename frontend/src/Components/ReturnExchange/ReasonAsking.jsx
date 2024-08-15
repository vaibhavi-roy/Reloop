// import React from 'react'
import { useEffect, useState } from "react";
import "./reasonAsking.scss";
import { useLocation } from "react-router-dom";

const ReasonAsking = () => {
	const location = useLocation();
	const [pageType, setPageType] = useState("");
	const [imageProduct, setImageProduct] = useState();
	const [preview, setPreview] = useState(null);
	const [reason, setReason] = useState("");
	const [imgUrl, setImageUrl] = useState("");
	useEffect(() => {
		if (location.pathname === "/exchange") setPageType("exchange");
		else if (location.pathname === "/return") setPageType("return");
	}, []);

	//handle image
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

	const uplaodImage = async () => {
		// const file = event.target.files[0];
		try {
			const data = new FormData();
			data.append("file", imageProduct);
			data.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);
			data.append("cloud_name", `${import.meta.env.VITE_CLOUD_NAME}`);

			const resp = await fetch(`${import.meta.env.VITE_CLOUDINARY_URL_TWO}`, {
				method: "post",
				body: data,
			});

			if (!resp.ok) {
				throw new Error("Failed to upload image");
			}

			const result = await resp.json();
			console.log(result);
			setImageUrl(result.secure_url);
		} catch (error) {
			console.log("Error uploading image:", error);
		}
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	if (imageProduct) {
	// 		// Handle the file upload here
	// 		console.log("File selected:", imageProduct);
	// 	}
	// };

	const saveData = () => {
		if (reason !== "" && imgUrl !== "") {
			sessionStorage.setItem("reason", reason);
			sessionStorage.setItem("imageUrl", imgUrl);
		}
	};
	return (
		<>
			<h2>
				{pageType === "return"
					? "Why are you returning?"
					: "Why are you exchanging?"}
			</h2>
			<div className="from-wrapper">
				<div className="return-form-one">
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
						<label htmlFor="reasonToReturn">
							{pageType === "return"
								? "Reason for Returning"
								: "Reason for Exchanging"}
						</label>
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
					<button className="submit-btn" type="submit" onClick={saveData}>
						Submit
					</button>
				</div>
				<div className="preview-container">
					{preview && <img src={preview} alt="Image Preview" />}
				</div>
				<button onClick={uplaodImage}>save</button>
			</div>
		</>
	);
};

export default ReasonAsking;
