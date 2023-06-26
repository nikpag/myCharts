import { Button, Col, Container, Row } from "react-bootstrap";
import SideHeader from "./SideHeader";
import Image from "next/image";
import { Line, Radar, Scatter, Bubble, PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto";

const NewChartDone = ({ setPage, chartData, data }) => {
	const handleSave = () => {
		const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/uploadAndCreateChart`;
		const options = {
			method: "POST",
			body: JSON.stringify({ email: data.user.email, chartData: chartData }),
			headers: {
				"Content-Type": "application/json"
			}
		};

		fetch(url, options);
	};

	const handleDiscard = () => {
		setPage("NewChart");
	};


	// Check what to do with nocolor in chartjsnodecanvas
	const ChartComponent = ({ type, data }) => {
		return {
			"line": <Line data={data} />,
			"multi": <Line data={data} />,
			"radar": <Radar data={data} />,
			"scatter": <Scatter data={data} />,
			"bubble": <Bubble data={data} />,
			"polar": <PolarArea data={data} />
		}[type];
	};

	return (
		<Container fluid>
			<Row>
				<SideHeader setPage={setPage} />
				<Col>
					<Row><h1 className="text-center my-5">Your {chartData.displayType} chart is ready!</h1></Row>
					<Row>
						{/* TODO Change image for canvas here (chart etc.) */}
						<Col xs={3} />
						<Col xs={6}>
							<div class="border rounded">
								{/* TODO Make chart responsive */}
								<ChartComponent type={chartData.requestType} data={chartData} />
							</div>
						</Col>
						<Col />
					</Row>
					<Row className="mt-5">
						<Col xs={3} />
						<Col xs={2}>
							<Button onClick={handleSave} variant="dark" className="w-100">
								Save to my charts
							</Button>
						</Col>
						<Col xs={2}>
							<Button onClick={handleDiscard} variant="danger" className="w-100">
								Discard
							</Button>
						</Col>
						<Col />
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default NewChartDone;
