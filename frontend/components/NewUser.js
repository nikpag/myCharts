import { signOut } from "next-auth/react";
import Header from "./Header";
import { Button, Col, Container, Row } from "react-bootstrap";

const NewUser = ({ data, setPage }) => {
	const handleContinue = async () => {
		const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/createUser`;
		const options = {
			method: "POST",
			body: JSON.stringify({ email: data.user.email }),
			headers: {
				"Content-Type": "application/json",
			}
		};

		// TODO Add a check for errors
		const response = await fetch(url, options);

		setPage("Account");
	};

	const handleNoThanks = () => {
		signOut();
	};

	return (<>
		<Header setPage={setPage} />

		<Container>
			<Row className="my-5 text-center">
				<h3>This is the first time you are logging in with {data.user.email}</h3>
			</Row>
			<Row>
				<h4>If you continue, your email will be stored in our user database, so you can store your created charts and purchase chart credits.</h4>
			</Row>
			<Row className="mt-5">
				<Col xs={4} />
				<Col xs={2}><Button onClick={handleContinue} variant="success" className="w-100">Continue</Button></Col>
				<Col xs={2}><Button onClick={handleNoThanks} variant="danger" className="w-100">No, thanks</Button></Col>
				<Col />
			</Row>
		</Container >
	</>
	);
};

export default NewUser;
