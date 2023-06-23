import Link from "next/link";
import Image from "next/image";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import SideHeader from "../components/side-header";

import lineChart from "../public/line-chart.png";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const NewChartDone = () => {
    let [image, setImage] = useState();
    let [chartType, setChartType] = useState();
    let { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") {
            return;
        }
        if (status === "unauthenticated") {
            return;
        }

        fetchData();
    }, [status]);

    async function fetchData() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/chartPreview`);

        const jsonData = await response.json();

        console.log(jsonData);

        setChartType(jsonData.chartType);
        setImage(jsonData.fileData);
    }

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p>Unauthorized</p>;
    }

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
                                        Your {chartType} chart is ready!
                                    </h1>
                                </Col>
                                <Col xs={3} />
                            </Row>
                            <Row>
                                <Container fluid>
                                    <Row>
                                        <Col xs={3} />
                                        <Col xs={6} className="p-0">
                                            <Image className="img-fluid" src={image ? `data:image/png;base64,${image}` : "/line-chart.png"} alt="" width="500" height="0" />
                                        </Col>
                                        <Col xs={3} />
                                    </Row>
                                    <Row className="mt-4">
                                        <Col xs={3} />
                                        <Col xs={2}>
                                            <Link href="/saveToMyCharts">
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
                    </Col >
                </Row >
            </Container >
        </>
    );
};

export default NewChartDone;
