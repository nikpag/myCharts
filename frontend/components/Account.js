import Header from "./Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AccountItem from "./AccountItem";
import { useEffect, useState } from "react";

const Account = ({ setPage, data }) => {
	const [userData, setUserData] = useState({ numberOfCharts: "", availableCredits: "", lastLogin: "" });
	const date = new Date(userData.lastLogin);
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const month = date.getMonth().toString().padStart(2, "0");
	const year = date.getFullYear().toString().padStart(2, "0");

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

	const fetchUserData = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/getUser/${data.user.email}`);

		const json = await response.json();

		setUserData(json);
	};

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

export default Account;;
