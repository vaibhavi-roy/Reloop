// import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./home.scss";
import heroImg from "../assets/hero.png";
import trackerImg from "../assets/tracker.jpg";
import exchangeImg from "../assets/exchange.jpg";
import returnImg from "../assets/return.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Tracker from "./Tracker";
import { Modal } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";

const Home = () => {
	const navigate = useNavigate();
	const [method, setMethod] = useState(null);
	const now = new Date();
	const nextDate = new Date();
	const prevDate = new Date();
	nextDate.setDate(nextDate.getDate() + 10);
	prevDate.setDate(prevDate.getDate() - 10);
	const [openTracker, setOpenTracker] = useState(false);
	const showModal = () => {
		setOpenTracker(true);
	};
	const handleOk = () => {
		setOpenTracker(false);
	};
	const handleCancel = () => {
		setOpenTracker(false);
	};
	useEffect(() => {
		setMethod(sessionStorage.getItem("type"));
	}, []);
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
					<button className="home-btn" onClick={showModal}>
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
			<Modal
				title="Time Line"
				open={openTracker}
				onOk={handleOk}
				onCancel={handleCancel}>
				<br />
				<br />
				{method !== "return" && method !== "exchange" && (
					<>
						<Timeline
							mode="left"
							items={[
								{
									children: `Deliverd on ${prevDate.getDate()}/${prevDate.getMonth()}/${prevDate.getFullYear()} to your place`,
								},
							]}
						/>
					</>
				)}
				{method === "return" && (
					<Timeline
						mode="left"
						items={[
							{
								label: "Order Placed",
								children: `on ${now.getDate()}/${now.getMonth()}/${now.getFullYear()} at ${now.toLocaleTimeString()}`,
							},
							{
								label: "Package will be picked",
								children: `on ${nextDate.getDate()}/${nextDate.getMonth()}/${nextDate.getFullYear()} from your place`,
								color: "green",
							},
							{
								dot: (
									<ClockCircleOutlined
										style={{
											fontSize: "16px",
										}}
									/>
								),
								label: `Package in-transit`,
								children: "takes atmost 2-3 days",
							},
							{
								color: "red",
								label: "Quality Checking & Authorization",
								children: (
									<>
										<br />
									</>
								),
							},
							// {
							// 	children: "Create a services site 2015-09-01",
							// },
							{
								color: "blue",
								label: "refund initiated",
								children: <>will be done after authorizing</>,
							},
							{
								label: `Refund Confirmed`,
								children: (
									<>
										will be done soon
										<br />
									</>
								),
								color: "green",
							},
						]}
					/>
				)}
				{method === "exchange" && (
					<Timeline
						mode="left"
						items={[
							{
								label: "Order Placed",
								children: `on ${now.getDate()}/${now.getMonth()}/${now.getFullYear()} at ${now.toLocaleTimeString()}`,
							},
							{
								label: "Package will be picked",
								children: `on ${nextDate.getDate()}/${nextDate.getMonth()}/${nextDate.getFullYear()} from your place`,
								color: "green",
							},
							{
								dot: (
									<ClockCircleOutlined
										style={{
											fontSize: "16px",
										}}
									/>
								),
								label: `Package in-transit`,
								children: "takes atmost 2-3 days",
							},
							{
								color: "red",
								label: "Quality Checking & Authorization",
								children: (
									<>
										<br />
									</>
								),
							},
							// {
							// 	children: "Create a services site 2015-09-01",
							// },
							{
								color: "green",
								label: "Return Shipment Initiation",
								children: (
									<>
										<br />
									</>
								),
							},
							{
								dot: (
									<ClockCircleOutlined
										style={{
											fontSize: "16px",
										}}
									/>
								),
								label: `Package in-transit`,
								children: "takes atmost 2-3 days",
							},
							{
								label: `Delivery date`,
								children: "will be provided",
							},
						]}
					/>
				)}
			</Modal>
		</div>
	);
};

export default Home;
