import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import SideHeader from "./SideHeader";
import { useEffect, useState } from "react";
import Image from "next/image";
import Papa from "papaparse";
import csvToJSON from "./csvToJson";
import ChartComponent from "./ChartComponent";
import { saveAs } from "file-saver";
import { chartTemplates, chartDemoData } from "./chartTemplates";

const NewChart = ({ setPage, setChartData, data }) => {
	const displayChartType = ["line", "multi axis line", "radar", "scatter", "bubble", "polar area"];
	const requestChartType = ["line", "multi", "radar", "scatter", "bubble", "polar"];
	const templateFileName = ["line", "multi-axis-line", "radar", "scatter", "bubble", "polar-area"];

	const credits = {
		"line": 1,
		"multi": 2,
		"radar": 4,
		"scatter": 2,
		"bubble": 3,
		"polar": 4,
	};

	const [index, setIndex] = useState(0);
	const [file, setFile] = useState();

	const handlePrevious = async () => {
		setIndex(index === 0 ? 5 : index - 1);
	};

	const handleNext = async () => {
		setIndex(index === 5 ? 0 : index + 1);
	};

	const handleDownload = () => {
		const blob = new Blob([chartTemplates[requestChartType[index]]]);
		saveAs(blob, `${templateFileName[index]}.csv`);
	};

	const handleChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleUpload = async () => {
		if (!file) {
			return;
		}

		// TODO Change this so we return only the user credits
		const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/getUser/${data.user.email}`;

		const response = await fetch(url);

		const user = await response.json();

		const userCredits = user.availableCredits;

		if (userCredits < credits[requestChartType[index]]) {
			console.log("Not enough credits!");
			return;
		}

		Papa.parse(file, {
			complete: async (results) => {
				// TODO Handle error here
				const json = await csvToJSON(results.data, requestChartType[index]);
				setChartData(json);
				setPage("NewChartDone");
			},
			error: (error) => {
				// TODO Handle error. also handle error in csvToJSON, since this error handler can't detect my custom data format errors for each chart
				console.log("CSV error", error);
			}
		});
	};

	const handleCancel = () => {
		setPage("MyCharts");
	};

	return (
		<Container fluid>
			<Row>
				<SideHeader setPage={setPage} />
				<Col>
					<Row className="text-center mt-5 mb-3">
						<h1>Let's create your own chart!</h1>
					</Row>
					<Row className="text-center">
						<Col xs={3} />
						<Col xs={6}>
							<div className="d-flex justify-content-center border rounded" style={{ height: "30vh" }}>
								<ChartComponent type={requestChartType[index]} data={chartDemoData[requestChartType[index]]} inCard={false} />
							</div>
						</Col>
						<Col />
					</Row>
					<Row className="mt-3">
						<Col xs={5} />
						<Col xs={1} className="px-1">
							<Button onClick={handlePrevious} className="w-100" variant="dark" >&#11164;</Button>
						</Col>
						<Col xs={1} className="px-1">
							<Button onClick={handleNext} className="w-100" variant="dark">&#11166;</Button>
						</Col>
						<Col />
					</Row>
					<Row className="text-end mt-5">
						<Col xs={3} />
						<Col xs={6}>
							<Button onClick={handleDownload} variant="dark" className="w-100" style={{ backgroundColor: process.env.NEXT_PUBLIC_MYCHARTS_PRIMARY_COLOR }}>
								Download chart description template for this chart
							</Button>
						</Col>
						<Col />
					</Row>

					<Form className="mt-5">
						<Row>
							<Col xs={3} />
							<Col xs={6}>
								<Form.Group>
									<Form.Label htmlFor="file"><h6>Select or drag file</h6></Form.Label>

									<Form.Control type="file" onChange={handleChange} id="file" name="file" />
								</Form.Group>
							</Col>
							<Col />
						</Row>
						<Row className="mt-3">
							<Col xs={3} />
							<Col xs={3}>
								<Button onClick={handleUpload} variant="dark" className="w-100">Upload and create {displayChartType[index]} chart</Button>
							</Col>
							<Col xs={1} />
							<Col xs={2} >
								<Button onClick={handleCancel} variant="danger" className="w-100">Cancel</Button>
							</Col>
							<Col />
						</Row>
					</Form>
				</Col>
			</Row >
		</Container >
	);
};

export default NewChart;
