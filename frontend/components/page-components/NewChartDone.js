import { Button, Col, Container, Row } from "react-bootstrap";
import SideHeader from "@/components/SideHeader";
import ChartComponent from "@/components/ChartComponent";

const NewChartDone = ({ setPage, chartData, data }) => {
	const handleSave = async () => {
		try {
			const url = `${process.env.NEXT_PUBLIC_URL_CHART_CREATE}`;

			const options = {
				method: "POST",
				body: JSON.stringify({ email: data.user.email, chartData: chartData }),
				headers: {
					"Content-Type": "application/json"
				}
			};

			const response = await fetch(url, options);

			if (!response.ok) {
				throw new Error("Network error");
			}

			setTimeout(() => {
				setPage("MyCharts");
			}, 200);
		}
		catch (error) {
			console.log("A network error was detected");
		}
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
