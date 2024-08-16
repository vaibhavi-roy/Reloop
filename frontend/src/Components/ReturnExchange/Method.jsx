// import React from 'react'
import { useEffect, useState } from "react";
import "./method.scss";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { applyReturn } from "../../Pages/Return";
import { Oval } from "react-loader-spinner";

const Method = () => {
	const navigate = useNavigate();
	const [method, setMethod] = useState(0);
	const [accountNumber, setAccountNumber] = useState();
	const [accountHolder, setAccountHolder] = useState("");
	const [ifsc, setIfsc] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (method === 3) {
			setMethod(0);
			navigate("/home");
		}
	}, []);
	const msg = async () => {
		await applyReturn();
		setIsLoading(false);
		setMethod(0);
		// console.log("show sweet alert");
		navigate("/home");
	};
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
						{!isLoading ? (
							<button
								className="btn-two"
								onClick={() => {
									sessionStorage.setItem("method", "Coin Transfer"),
										msg(),
										setIsLoading(true);
								}}>
								<span>Add Coins to Wallet</span>
							</button>
						) : (
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
						)}
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
							{!isLoading ? (
								<button
									onClick={() => {
										setIsLoading(true), msg();
									}}>
									Done
								</button>
							) : (
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
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Method;
