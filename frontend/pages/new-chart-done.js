import SideHeader from "../components/side-header";
import Link from "next/link";
import { Row, Col, Container, Button } from "react-bootstrap";
import Image from "next/image";
import lineChart from "../public/line-chart.png";

export default function NewChartDone() {
    return (
        <>
            <Container fluid>
                <Row>
                    <SideHeader />
                    <Col className="m-5 d-flex justify-content-center">
                        <Container fluid>
                            <Row>
                                <Col xs={3} />
                                <Col xs={6}>
                                    <h1 className="mb-5">
                                        Your (selected type) chart is ready!
                                    </h1>
                                </Col>
                                <Col xs={3} />
                            </Row>
                            <Row>
                                <Container fluid>
                                    <Row>
                                        <Col xs={3} />
                                        <Col xs={6} className="p-0">
                                            <Image className="img-fluid" src={lineChart} alt="" />
                                        </Col>
                                        <Col xs={3} />
                                    </Row>
                                    <Row className="mt-4">
                                        <Col xs={3} />
                                        <Col xs={2}>
                                            <Link href="/saveChart">
                                                <Button variant="dark" className="w-100">
                                                    Save to my charts
                                                </Button>
                                            </Link>
                                        </Col>
                                        <Col xs={2}>
                                            <Link href="/new-chart">
                                                <Button variant="danger" className="w-100">
                                                    Discard
                                                </Button>
                                            </Link>
                                        </Col>
                                        <Col xs={5} />
                                    </Row>
                                </Container>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container >
        </>
    );
}
