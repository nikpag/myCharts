import Header from "@/components/Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreditsCard from "@/components/CreditsCard";

// Credits page. Here, the user can buy chart credits. After buying the desired amount of credits,
// the user is redirected to the account page, in order to see their updated credits.
const Credits = ({ setPage, data }) => {

	// We use closures here. That means that we have a function that returns another function,
	// whose functionality depends on the parameter passed to the outer function.
	// This way, we can write one handler function that can represent all cases (5, 10, 20, 50 credits).
	const handleBuy = (credits) => {
		return async () => {
			try {
				const url = process.env.NEXT_PUBLIC_URL_CREDITS_UPDATE;
				const options = {
					method: "POST",
					body: JSON.stringify({ email: data.user.email, credits }),
					headers: {
						"Content-Type": "application/json"
					}
				};

				const response = await fetch(url, options);

				if (!response.ok) {
					throw new Error("Network error");
				}

				// After increasing user's credits, redirect to account page to see the updated credits
				setPage("Account");
			}
			catch (error) {
				console.log("A network error was detected.");
			}
		};
	};

	const handleCancel = () => {
		// Just go back to account page
		setPage("Account");
	};

	return (
		<>
			<Header setPage={setPage} />

			<Container>
				<Row className="text-center mt-5"><h3>You are logged in as {data.user.email}</h3></Row>
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
