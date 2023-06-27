import Header from "./Header";
import { Button, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import ChartCard from "./ChartCard";
import { signIn } from "next-auth/react";

const MyChartsLanding = ({ setPage }) => {
	const handleLogin = async () => {
		signIn("google");
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
