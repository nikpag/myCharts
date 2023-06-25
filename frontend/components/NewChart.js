import { Button, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import SideHeader from "./SideHeader";
import { useState } from "react";
import Image from "next/image";

const NewChart = ({ setPage }) => {
	const image = ["/line.png", "/multi.png", "/radar.png", "/scatter.png", "/bubble.png", "/polar.png"];

	const [index, setIndex] = useState(0);

	const handlePrevious = () => {
		setIndex(index === 0 ? 5 : index - 1);
	};

	const handleNext = () => {
		setIndex(index === 5 ? 0 : index + 1);
	};

	const handleDownloadTemplate = () => {
		// TODO
	};

	const handleUpload = () => {
		// TODO
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
							<div className="border rounded" style={{ position: "relative", height: "40vh" }}>
								<Image src={image[index]} alt="" fill={true} style={{ objectFit: "contain" }} />
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
						<Col xs={4} />
						<Col xs={4}><Button onClick={handleDownloadTemplate} variant="dark" className="w-100" style={{ backgroundColor: process.env.NEXT_PUBLIC_PURPLE }}>Download chart description template for <b>TODO chart</b></Button></Col>
						<Col />
					</Row>

					{/* TODO Insert vertical space with an elegant method */}
					<div style={{ height: "5vh" }}></div>

					<Form className="mt-5">
						<Row>
							<Col xs={3} />
							<Col xs={6}>
								<Form.Group>
									<Form.Label htmlFor="file"><h6>Select or drag file</h6></Form.Label>
									<Form.Control type="file" id="file" name="file" />
								</Form.Group>
							</Col>
							<Col />
						</Row>
						<Row className="mt-3">
							<Col xs={3} />
							<Col xs={3}>
								<Button onClick={handleUpload} variant="dark" className="w-100">Upload and create chart</Button>
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
