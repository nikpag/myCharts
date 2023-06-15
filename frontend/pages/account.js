import Link from "next/link";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import AccountFormItem from "../components/account-form-item";
import Header from "../components/header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Account() {
	const [userData, setUserData] = useState({ numberOfCharts: 0, availableCredits: 0, lastLogin: 0 });
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "loading") {
			return;
		}

		if (status === "unauthenticated") {
			return;
		}

		fetchData(session.user.email);
	}, []);

	async function fetchData(email) {
		const response = await fetch(`http://localhost:3001/getUser/${email}`);

		const jsonData = await response.json();

		setUserData(jsonData);
	}

	if (status === "loading") {
		return false;
	}

	if (status === "unauthenticated") {
		return <h1>Not authenticated</h1>;
	}

	return (
		<>
			<Header></Header>

			<Container>
				<Row>
					<Col xs={4}></Col>
					<Col>
						<h3 className="my-5">
							Hello, {session.user.email}
						</h3>
					</Col>
					<Col xs={3}></Col>
				</Row>

				<Form>
					<AccountFormItem
						labelText="Number of charts"
						id="numberOfCharts"
						value={userData.numberOfCharts}
					/>
					<AccountFormItem
						labelText="Available credits"
						id="availableCredits"
						value={userData.availableCredits}
					/>
					<AccountFormItem
						labelText="Last login"
						id="lastLogin"
						value={userData.lastLogin || ""}
					/>
				</Form>

				<Row>
					<Col xs={4}></Col>
					<Col>
						<Link href="my-charts">
							<Button className="mt-5 w-100" variant="dark">
								My charts
							</Button>
						</Link>
					</Col>

					<Col>
						<Link href="new-chart">
							<Button className="mt-5 w-100" variant="dark">
								New chart
							</Button>
						</Link>
					</Col>

					<Col>
						<Link href="credits">
							<Button variant="dark" className="mt-5 w-100">
								Buy credits
							</Button>
						</Link>
					</Col>
					<Col xs={4}></Col>
				</Row>
			</Container>
		</>
	);
}
