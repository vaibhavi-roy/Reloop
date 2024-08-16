import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./tracker.scss";

const Tracker = () => {
	const navigate = useNavigate();
	const [timeline, setTimeline] = useState(0);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchTimeline = async () => {
			try {
				const response = await axios.post(
					"http://localhost:5000/api/return-timeline",
					{
						product_id: "product_id",
						order_id: "order_id",
					}
				);

				setTimeline(response.data);
			} catch (err) {
				setError(
					err.response?.data?.error || "Error fetching the return timeline"
				);
			}
		};

		fetchTimeline();
	}, []);

	const handleBackClick = () => {
		navigate("/home");
	};

	return (
		<div className="trackerPage">
			<button className="backButton" onClick={handleBackClick}>
				back
			</button>
			<div className="trackerContainer">
				<h2 className="title">Return Tracker</h2>
				{error && <p className="error">{error}</p>}

				<div className="tracker">
					<div className="trackerHeader">
						<h3>{timeline.section}</h3>
						<p>
							Return Initiated:{" "}
							{new Date(timeline.return_initiate_date).toLocaleString()}
						</p>
						<p>
							Pickup Date:{" "}
							{new Date(timeline.return_pickup_date).toLocaleString()}
						</p>
						<p>
							Refund Initiated:{" "}
							{new Date(timeline.refund_initiate_date).toLocaleString()}
						</p>
						<p>Refund Completed: {timeline.refund_complete ? "Yes" : "No"}</p>
					</div>
					<div className="timeline">
						<div className="timelineStep">
							<div className="timelineMarker"></div>
							<div className="timelineContent">
								<p className="date">
									{new Date(timeline.return_initiate_date).toLocaleString()}
								</p>
								<p className="detail">Return Initiated</p>
							</div>
						</div>
						<div className="timelineStep">
							<div className="timelineMarker"></div>
							<div className="timelineContent">
								<p className="date">
									{new Date(timeline.return_pickup_date).toLocaleString()}
								</p>
								<p className="detail">Return Pickup</p>
							</div>
						</div>
						<div className="timelineStep">
							<div className="timelineMarker"></div>
							<div className="timelineContent">
								<p className="date">
									{new Date(timeline.refund_initiate_date).toLocaleString()}
								</p>
								<p className="detail">Refund Initiated</p>
							</div>
						</div>
						<div className="timelineStep">
							<div className="timelineMarker"></div>
							<div className="timelineContent">
								<p className="date">
									{timeline.refund_complete
										? "Refund Completed"
										: "Refund Pending"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tracker;
