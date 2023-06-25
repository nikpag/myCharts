import Header from "./Header";
import { Button, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import ChartCard from "./ChartCard";

const MyChartsLanding = ({ setPage }) => {
	const handleLogin = () => {

	};

	return (
		<>
			<Header setPage={setPage} />

			<Container className="mt-5">
				<Row className="flex-nowrap overflow-auto">
					<ChartCard src="/line.png" title="Line chart" />
					<ChartCard src="/multi.png" title="Multi axis line chart" />
					<ChartCard src="/radar.png" title="Radar chart" />
					<ChartCard src="/scatter.png" title="Scatter chart" />
					<ChartCard src="/bubble.png" title="Bubble chart" />
					<ChartCard src="/polar.png" title="Polar area chart" />
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
