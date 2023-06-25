import Header from "./Header";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AccountItem from "./AccountItem";

const Account = ({ setPage }) => {
	const handleMyCharts = () => {
		setPage("MyCharts");
	};

	const handleNewChart = () => {
		setPage("NewChart");
	};

	const handleBuyCredits = () => {
		setPage("Credits");
	};

	return (
		<>
			<Header setPage={setPage} />

			<Container>
				<Row className="my-5">
					<Col />
					<Col><h3 className="text-center">Hello, TODO</h3></Col>
					<Col />
				</Row>

				<Form>
					<AccountItem label="Number of charts" value="TODO" id="numberOfCharts" />
					<AccountItem label="Available credits" value="TODO" id="availableCredits" />
					<AccountItem label="Last login" value="TODO" id="lastLogin" />
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

export default Account;
