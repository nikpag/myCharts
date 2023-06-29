import Header from "@/components/Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreditsCard from "@/components/CreditsCard";

const Credits = ({ setPage, data }) => {
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

				setPage("Account");
			}
			catch (error) {
				console.log("A network error was detected.");
			}
		};
	};

	const handleCancel = () => {
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
