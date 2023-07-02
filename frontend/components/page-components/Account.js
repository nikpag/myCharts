import Header from "@/components/Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AccountItem from "@/components/AccountItem";
import { useEffect, useState } from "react";

// Account page, where user can see how many charts he has saved, his credits, and his last login
// From the account page, he can navigate to all the main parts of the app, like:
//     - Buy credits
//     - New chart
//     - My charts
const Account = ({ setPage, data }) => {
	// Data for one specific user
	const [userData, setUserData] = useState({ numberOfCharts: "", availableCredits: "", lastLogin: "" });

	// Extract hh:mm:ss, dd/mm/yyyy from lastLogin in order to format the lastLogin field correctly
	const date = new Date(userData.lastLogin);
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString().padStart(2, "0");

	// If the date is invalid, that means we haven't fetched the data from the backend yet.
	// Render nothing in this case
	const lastLogin = date.toString() === "Invalid Date"
		? ""
		: `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;

	const handleMyCharts = () => {
		setPage("MyCharts");
	};

	const handleNewChart = () => {
		setPage("NewChart");
	};

	const handleBuyCredits = () => {
		setPage("Credits");
	};

	// Get user data from the backend, and update the frontend accordingly, with setUserData()
	const fetchUserData = async () => {
		try {

			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_USER_GET}/${data.user.email}`);

			if (!response.ok) {
				throw new Error("Network error");
			}

			const json = await response.json();

			setUserData(json);
		}
		catch (error) {
			console.log("A network error was detected.");
		}
	};

	// useEffect() is called once the react components have mounted
	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<>
			<Header setPage={setPage} />

			<Container>
				<Row className="my-5">

					<h3 className="text-center">Hello, {data.user.email}</h3>
				</Row>

				<Form>
					<AccountItem label="Number of charts" value={userData.numberOfCharts} id="numberOfCharts" />
					<AccountItem label="Available credits" value={userData.availableCredits} id="availableCredits" />
					<AccountItem label="Last login" value={lastLogin} id="lastLogin" />
				</Form>

				<Row className="mt-5">
					<Col xs={3} />
					{/* Navigation is done using buttons instead of links, in order to provide a single-page experience */}
					<Col xs={2}>
						<Button onClick={handleMyCharts} variant="dark" className="w-100">My charts</Button>
					</Col>
					<Col xs={2}>
						<Button onClick={handleNewChart} variant="dark" className="w-100">New chart</Button>
					</Col>
					<Col xs={2}>
						<Button onClick={handleBuyCredits} variant="dark" className="w-100">Buy credits</Button>
					</Col>
					<Col />
				</Row>
			</Container>
		</>
	);
};

export default Account;
