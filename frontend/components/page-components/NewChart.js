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

// In the new chart page, the user can see an example of each of the available chart types,
// as well as download a template that describes that very chart. This way, there is immediate feedback on how the chart will look like,
// and the chart description templates don't have to be too complicated/general.
// After downloading a template, the user can upload his edited file in order to create his own custom chart.
// If the user has enough credits, and there were no errors while reading or uploading the file,
// they are redirected to the "new chart done" page, were they can choose to save the chart or discard it.
// On error, a modal pops up, containing the appropriate error text.
const NewChart = ({ setPage, setChartData, data }) => {
	// Display chart type: how the chart type should appear to the end user
	// Request chart type: how the chart type appears to our app logic (client-side, microservices etc.)
	// Template file name: how the chart template file will be named after download
	const displayChartType = ["line", "multi axis line", "radar", "scatter", "bubble", "polar area"];
	const requestChartType = ["line", "multi", "radar", "scatter", "bubble", "polar"];
	const templateFileName = ["line", "multi-axis-line", "radar", "scatter", "bubble", "polar-area"];

	// Selected chart type index, updates on left/right button click, governs when every variable/element should change/rerender
	const [index, setIndex] = useState(0);
	// Holds the information of the file uploaded by the user
	const [file, setFile] = useState();
	// Governs if the error modal should show up, true when an error occurs
	const [showModal, setShowModal] = useState(false);
	// Modal error text (e.g. "Not enough credits", "Chart template errors" etc.)
	const [modalText, setModalText] = useState();

	// Change selected index when previous button is clicked
	const handlePrevious = async () => {
		setIndex(index === 0 ? 5 : index - 1);
	};

	// Change selected index when next button is clicked
	const handleNext = async () => {
		setIndex(index === 5 ? 0 : index + 1);
	};

	// Called when the user clicks "Download chart description template"
	const handleDownload = () => {
		const blob = new Blob([chartTemplates[requestChartType[index]]]);
		saveAs(blob, `${templateFileName[index]}.csv`);
	};

	// Updates when the user chooses a file for upload
	const handleChange = (event) => {
		setFile(event.target.files[0]);
	};

	// Called when user eventually clicks upload
	const handleUpload = async () => {
		try {
			// Don't do anything if no file is selected
			if (!file) {
				return;
			}

			// Get user data in order to view their credits
			const url = `${process.env.NEXT_PUBLIC_URL_USER_GET}/${data.user.email}`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Network error");
			}

			const user = await response.json();

			const userCredits = user.availableCredits;

			// If the user doesn't have enough credits, don't let them create the chart,
			// and make the error modal appear
			if (userCredits < chartCredits[requestChartType[index]]) {
				setShowModal(true);
				setModalText("It looks like you don't have enough credits for this chart! Buy some more credits and try again.");
				return;
			}

			// Parse the uploaded CSV file and convert it to chart description JSON
			Papa.parse(file, {
				complete: async (results) => {
					try {
						const json = csvToJSON(results.data, requestChartType[index]);
						setChartData(json);
						setPage("NewChartDone");
					}
					catch (error) {
						// If an error is caught here, it means the file has been read correctly,
						// but there is no interpretation of the chart data that results in a valid chart.
						// One typical example of this is when trying to create a line chart with a bubble chart description.
						// Notice, however, that some description templates of different chart types may not produce an error.
						// As an example, line chart descriptions and polar area chart descriptions have the same form.
						// We consider this to be a feature, not a bug, because we want charts that make sense in both types to be recognisable
						// from our app, without the user having the mental overhead to specify the type of the chart.
						setShowModal(true);
						setModalText("Your uploaded file contains errors! Make sure you have filled the chart description template correctly and try again.");
					}
				},
				error: (error) => {
					// In contrast with the above error handling, if an error is caught here,
					// it means that the file couldn't be read correctly.
					// The most usual cause is if the user has chosen a file for upload,
					// and the file has been deleted since. This way,
					// when the user clicks on "Upload", the parser can't read a file that doesn't exist
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
		// Just navigate back to my charts page
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

					{/* Here, the chart type preview is rendered */}
					<Row className="text-center">
						<Col xs={3} />
						<Col xs={6}>
							<div className="d-flex justify-content-center border rounded" style={{ height: "45vh" }}>
								<ChartComponent type={requestChartType[index]} data={chartDemoData[requestChartType[index]]} maintainAspectRatio={false} />
							</div>
						</Col>
						<Col />
					</Row>

					{/* Navigation buttons */}
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

					{/* Download chart template example button */}
					<Row className="text-end mt-5">
						<Col xs={3} />
						<Col xs={6}>
							<Button onClick={handleDownload} variant="dark" className="w-100" style={{ backgroundColor: process.env.NEXT_PUBLIC_MYCHARTS_PRIMARY_COLOR }}>
								Download chart description template for this chart
							</Button>
						</Col>
						<Col />
					</Row>

					{/* Form for file upload */}
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
			</Row>
		</Container>
	);
};

export default NewChart;
