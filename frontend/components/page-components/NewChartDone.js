import { Button, Col, Container, Row } from "react-bootstrap";
import SideHeader from "@/components/SideHeader";
import ChartComponent from "@/components/ChartComponent";
import chartCredits from "@/utils/chartCredits";

const NewChartDone = ({ setPage, chartData, data }) => {
	const handleSave = async () => {
		// TODO Change url names
		// TODO Make chart increasing and credits subtracting be done from the user-data service, as it listens
		// TODO Only when the chart is actually saved should the available credits be subtracted (and number of charts increased)
		let url = process.env.NEXT_PUBLIC_URL_CREDITS_UPDATE;

		let options = {
			method: "POST",
			body: JSON.stringify({ email: data.user.email, credits: -chartCredits[chartData.requestType] }),
			headers: {
				"Content-Type": "application/json"
			}
		};

		await fetch(url, options);

		url = `${process.env.NEXT_PUBLIC_URL_CHART_CREATE}`;

		options = {
			method: "POST",
			body: JSON.stringify({ email: data.user.email, chartData: chartData }),
			headers: {
				"Content-Type": "application/json"
			}
		};

		await fetch(url, options);

		url = `${process.env.NEXT_PUBLIC_URL_NUMCHARTS_INCREMENT}`;

		options = {
			method: "POST",
			body: JSON.stringify({ email: data.user.email }),
			headers: {
				"Content-Type": "application/json"
			}
		};

		await fetch(url, options);

		setTimeout(() => {
			setPage("MyCharts");
		}, 1000);


	};

	const handleDiscard = () => {
		setPage("NewChart");
	};

	return (
		<Container fluid>
			<Row>
				<SideHeader setPage={setPage} />
				<Col>
					<Row><h1 className="text-center my-5">Your {chartData.displayType} chart is ready!</h1></Row>
					<Row>
						<Col xs={3} />
						<Col xs={6}>
							<div className="d-flex justify-content-center border rounded" style={{ height: "60vh" }}>
								<ChartComponent type={chartData.requestType} data={chartData} maintainAspectRatio={false} />
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
