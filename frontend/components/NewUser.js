import Header from "./Header";
import { Button, Col, Container, Row } from "react-bootstrap";

const NewUser = ({ setPage }) => {
	const handleContinue = () => {
		// TODO
	};

	const handleNoThanks = () => {
		setPage("MyChartsLanding");
	};

	return (<>
		<Header />

		<Container>
			<Row className="my-5">
				<Col xs={2} />
				<Col xs={8}><h3>This is the first time you are logging in with TODO. </h3></Col>
				<Col />
			</Row>
			<Row>
				<Col xs={2} />
				<Col xs={8}><h4>If you continue, your email will be stored in our user database, so you can store your created charts and purchase chart credits.</h4></Col>
				<Col />
			</Row>
			<Row className="mt-5">
				<Col xs={4} />
				<Col xs={2}><Button onClick={handleContinue} variant="success" className="w-100">Continue</Button></Col>
				<Col xs={2}><Button onClick={handleNoThanks} variant="danger" className="w-100">No, thanks</Button></Col>
				<Col />
			</Row>
		</Container>
	</>
	);
};

export default NewUser;
