// import React from 'react'
import { useEffect, useState } from "react";
import "./reasonAsking.scss";
import { useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { CgCheckO } from "react-icons/cg";

const ReasonAsking = () => {
	const location = useLocation();
	const [pageType, setPageType] = useState("");
	const [imageProduct, setImageProduct] = useState();
	const [preview, setPreview] = useState(null);
	const [reason, setReason] = useState("");
	const [imgUrl, setImageUrl] = useState("");
	const [isSaveShow, setIsSaveShow] = useState(false);
	const [isSaveClicked, setIsSaveClicked] = useState(false);
	const [isLoading, setIsloading] = useState(false);
	const [change, setChange] = useState(false);
	const [allfieldGiven, setAllfieldGiven] = useState(0);
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
			setIsSaveShow(true);
		}
	};

	const uplaodImage = async () => {
		// const file = event.target.files[0];
		setIsloading(true);
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
			setIsSaveClicked(true);
			setIsSaveShow(false);
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
			setChange(true);
			setAllfieldGiven(1);
		} else {
			setAllfieldGiven(2);
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
					{isSaveClicked && !change && (
						<button className="submit-btn" type="submit" onClick={saveData}>
							Submit
						</button>
					)}
					{change && allfieldGiven === 1 && <CgCheckO size={40} />}
					{allfieldGiven === 2 && (
						<span style={{ color: "#f47421" }}>You must fill all the data</span>
					)}
				</div>
				<div className="preview-container">
					{preview && <img src={preview} alt="Image Preview" />}
				</div>
				{isSaveShow && (
					<>
						{!isLoading ? (
							<button
								onClick={uplaodImage}
								id="save-btn"
								className="submit-btn">
								save image
							</button>
						) : (
							<div id="save-btn">
								<Oval
									visible={true}
									height="80"
									width="80"
									color="#4fa94d"
									ariaLabel="oval-loading"
									wrapperStyle={{}}
									wrapperClass=""
								/>
							</div>
						)}
					</>
				)}
				{isSaveClicked && (
					<span id="save-btn" style={{ color: "#f47421" }}>
						{" "}
						Image Saved successfully!!
					</span>
				)}
			</div>
		</>
	);
};

export default ReasonAsking;
