// import React from 'react'
import { useEffect, useState } from "react";
import "./method.scss";
import { useNavigate } from "react-router-dom";
import { applyReturn } from "../../Pages/Return";

const Method = () => {
	const navigate = useNavigate();
	const [method, setMethod] = useState(0);
	const [accountNumber, setAccountNumber] = useState();
	const [accountHolder, setAccountHolder] = useState("");
	const [ifsc, setIfsc] = useState("");

	useEffect(() => {
		if (method === 3) {
			setMethod(0);
			navigate("/home");
		} else if (method === 2) {
			setMethod(0);
			console.log("show sweet alert");
			navigate("/home");
		}
	}, []);

	return (
		<>
			{method === 0 && (
				<>
					<h2>Which refund method do you prefer ?</h2>
					<div className="two-btn-container">
						<button
							className="btn-one"
							onClick={() => {
								setMethod(1), sessionStorage.setItem("method", "NEFT");
							}}>
							<span>Receive Money</span>
							<br />
							(NEFT - account details required)
						</button>
						<button
							className="btn-two"
							onClick={() => {
								setMethod(2), sessionStorage.setItem("method", "Coin Transfer");
							}}>
							<span>Add Coins to Wallet</span>
						</button>
					</div>
				</>
			)}
			{method === 1 && (
				<>
					<h2>Please provide us your Account details</h2>
					<div className="account-form-wrapper">
						<div className="sections">
							<span>Account Number</span>
							<input
								type="text"
								value={accountNumber}
								onChange={(e) => setAccountNumber(e.target.value)}
								required
							/>
						</div>
						<div className="sections">
							<span>Account Holder Name</span>
							<input
								type="text"
								value={accountHolder}
								onChange={(e) => setAccountHolder(e.target.value)}
								required
							/>
						</div>
						<div className="sections">
							<span>IFSC Code</span>
							<input
								type="text"
								value={ifsc}
								onChange={(e) => setIfsc(e.target.value)}
								required
							/>
						</div>
						<div className="btn-container">
							<button
								onClick={() => {
									console.log("now click on apply button");
								}}>
								Done
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Method;
