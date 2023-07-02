import Header from "@/components/Header";
import { Button, Container, Row } from "react-bootstrap";
import Footer from "@/components/Footer";
import ChartCard from "@/components/ChartCard";
import { signIn } from "next-auth/react";

// Landing page, shown when the user hasn't logged in yet. Some chart previews are shown, as well as a prompt to sign in with google
const MyChartsLanding = ({ setPage }) => {
	// Save the "shouldUpdateLastLogin" variable to sessionStorage,
	// so the microservices involved with user data know whether the user clicked the sign in button,
	// or has been redirected to the account page in another way.
	// This prevents the "Last Login" field to be updated on page refresh,
	// and only clicking the "sign in" link updates the user's last login
	const handleLogin = async () => {
		signIn("google");
		sessionStorage.setItem("shouldUpdateLastLogin", "true");
	};

	return (
		<>
			<Header setPage={setPage} />

			<Container className="mt-5">
				<Row className="flex-nowrap overflow-auto">
					<ChartCard type="line" title="Line chart" />
					<ChartCard type="multi" title="Multi axis line chart" />
					<ChartCard type="radar" title="Radar chart" />
					<ChartCard type="scatter" title="Scatter chart" />
					<ChartCard type="bubble" title="Bubble chart" />
					<ChartCard type="polar" title="Polar area chart" />
				</Row>

				<Row className="mt-5">
					<h4>
						To start creating your diagrams, please <Button onClick={handleLogin} className="p-0" variant="link"><h4>login with your google account</h4></Button>
					</h4>
				</Row>

				<hr />

				<Footer setPage={setPage} />

			</Container>
		</>
	);
};

export default MyChartsLanding;
