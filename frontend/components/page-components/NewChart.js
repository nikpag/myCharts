import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SideHeader from "@/components/SideHeader";
import { useState } from "react";
import Papa from "papaparse";
import csvToJSON from "@/utils/csvToJSON";
import ChartComponent from "@/components/ChartComponent";
import { saveAs } from "file-saver";
import { chartTemplates, chartDemoData } from "@/utils/chartTemplates";
import chartCredits from "@/utils/chartCredits";
import ErrorModal from "@/components/ErrorModal";

const NewChart = ({ setPage, setChartData, data }) => {
	const displayChartType = ["line", "multi axis line", "radar", "scatter", "bubble", "polar area"];
	const requestChartType = ["line", "multi", "radar", "scatter", "bubble", "polar"];
	const templateFileName = ["line", "multi-axis-line", "radar", "scatter", "bubble", "polar-area"];

	const [index, setIndex] = useState(0);
	const [file, setFile] = useState();
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState();

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
		try {
			if (!file) {
				return;
			}

			const url = `${process.env.NEXT_PUBLIC_URL_USER_GET}/${data.user.email}`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Network error");
			}

			const user = await response.json();

			const userCredits = user.availableCredits;

			if (userCredits < chartCredits[requestChartType[index]]) {
				setShowModal(true);
				setModalText("It looks like you don't have enough credits for this chart! Buy some more credits and try again.");
				return;
			}

			Papa.parse(file, {
				complete: async (results) => {
					try {
						const json = csvToJSON(results.data, requestChartType[index]);
						setChartData(json);
						setPage("NewChartDone");
					}
					catch (error) {
						setShowModal(true);
						setModalText("Your uploaded file contains errors! Make sure you have filled the chart description template correctly and try again.");
					}
				},
				error: (error) => {
					setShowModal(true);
					setModalText("There was an error while reading your file! Make sure the file exists and try again!");
				}
			});
		}
		catch (error) {
			console.log("A network error was detected.");
		}
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
							<div className="d-flex justify-content-center border rounded" style={{ height: "45vh" }}>
								<ChartComponent type={requestChartType[index]} data={chartDemoData[requestChartType[index]]} maintainAspectRatio={false} />
							</div>
						</Col>
						<Col />
					</Row>
					<Row className="mt-3">
						<Col xs={5} />
						<Col xs={1} className="px-1">
							<Button onClick={handlePrevious} className="w-100" variant="dark">{"<"}</Button>
						</Col>
						<Col xs={1} className="px-1">
							<Button onClick={handleNext} className="w-100" variant="dark">{">"}</Button>
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
								<ErrorModal show={showModal} setShow={setShowModal} text={modalText} />
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
