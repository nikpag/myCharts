import Header from "./Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreditsCard from "./CreditsCard";

const Credits = ({ setPage }) => {
	const handleBuy = (credits) => {
		return async () => {
			const url = `ENVTODO/buy`;
			const options = {
				method: "POST",
				// TODO Will need to integrate email somehow
				body: JSON.stringify({ email, credits }),
				// TODO Probably will need application/json content type header here
			};

			const response = await fetch(url, options);

			setPage("Account");
		};
	};

	const handleCancel = () => {
		setPage("Account");
	};

	return (
		<>
			<Header setPage={setPage} />

			<Container>
				<Row className="text-center mt-5"><h3>You are logged in as TODO</h3></Row>
				<Row>
					<Col xs={2} />
					<Col xs={2}>
						<CreditsCard credits={5} onClick={handleBuy(5)} />
					</Col>
					<Col xs={2}>
						<CreditsCard credits={10} onClick={handleBuy(10)} />
					</Col>
					<Col xs={2}>
						<CreditsCard credits={20} onClick={handleBuy(20)} />
					</Col>
					<Col xs={2}>
						<CreditsCard credits={50} onClick={handleBuy(50)} />
					</Col>
					<Col />
				</Row>
				<Row>
					<Col />
					<Col xs={3}>
						<Button onClick={handleCancel} className="w-100" variant="danger">Cancel purchase</Button>
					</Col>
					<Col />
				</Row>
			</Container >
		</>
	);
};

export default Credits;
