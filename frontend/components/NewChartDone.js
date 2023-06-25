import { Button, Col, Container, Row } from "react-bootstrap";
import SideHeader from "./SideHeader";
import Image from "next/image";

const NewChartDone = ({ setPage }) => {
	const handleSave = () => {
		// TODO Fetch some stuff
	};

	const handleDiscard = () => {
		setPage("NewChart");

	};

	return (
		<Container fluid>
			<Row>
				<SideHeader setPage={setPage} />
				<Col>
					<Row><h1 className="text-center my-5">Your TODO chart is ready!</h1></Row>
					<Row>
						{/* TODO Change image for canvas here (chart etc.) */}
						<Col xs={3} />
						<Col xs={6}>
							<div class="border rounded" style={{ position: "relative", height: "60vh" }}>
								<Image src="/line.png" fill={true} alt="" style={{ objectFit: "contain" }} />
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
