import Link from "next/link";
import Image from "next/image";

import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import React, { useState } from "react";

import SideHeader from "../components/side-header";

import bubble from "../public/bubble.png";
import lineChart from "../public/line-chart.png";
import multiAxisLineChart from "../public/multi-axis-line-chart.png";
import polarArea from "../public/polar-area.png";
import radar from "../public/radar.png";
import scatter from "../public/scatter.png";

export default function NewChart() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    function CarouselItem({ src, index }) {
        let className = index === activeIndex ? " active" : "";
        return (
            <Carousel.Item className={`${className}`}>
                <Row>
                    <Col />
                    <Col>
                        <Image src={src} alt="" height="220" />
                    </Col>
                    <Col />
                </Row>
            </Carousel.Item>
        );
    }



    return (
        <>
            <Container fluid>
                <Row>
                    <SideHeader />
                    <Col className="mt-5">
                        <Container>
                            <h1 className="mb-5 text-center">
                                Let's create your own chart!
                            </h1>
                            <Row>
                                <Col xs={2}></Col>
                                <Col>
                                    <Carousel
                                        variant="dark"
                                        slide={false}
                                        interval={null}
                                        indicators={false}
                                        activeIndex={activeIndex}
                                        onSelect={handleSelect}
                                    >
                                        <CarouselItem
                                            src={lineChart}
                                            index={0}
                                            activeIndex={activeIndex}
                                        />
                                        <CarouselItem
                                            src={multiAxisLineChart}
                                            index={1}
                                            activeIndex={activeIndex}
                                        />
                                        <CarouselItem
                                            src={radar}
                                            index={2}
                                            activeIndex={activeIndex}
                                        />
                                        <CarouselItem
                                            src={scatter}
                                            index={3}
                                            activeIndex={activeIndex}
                                        />
                                        <CarouselItem
                                            src={bubble}
                                            index={4}
                                            activeIndex={activeIndex}
                                        />
                                        <CarouselItem
                                            src={polarArea}
                                            index={5}
                                            activeIndex={activeIndex}
                                        />
                                    </Carousel>
                                </Col>
                                <Col xs={2} />
                            </Row>
                            <Row className="mt-3 text-center">
                                <p>
                                    Download chart description template for (selected type)
                                </p>
                            </Row>

                            {/* Vertical spacing */}
                            <Row className="mt-5"></Row>
                            <Row className="mt-5"></Row>
                            <Row className="mt-5"></Row>

                            <Row>
                                <Col xs={3} />
                                <Col>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label htmlFor="formFile" className="">
                                                <h6>
                                                    Select or drag file
                                                </h6>
                                            </Form.Label>
                                            <Form.Control type="file" id="formFile" className="w-100" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col xs={3} />
                            </Row>
                            <Row className="mt-3">
                                <Col xs={3} />
                                <Col xs={2}>
                                    <Link href="new-chart-done">
                                        <Button variant="dark" onClick={handleShow} className="w-100">
                                            Upload and create chart
                                        </Button>
                                    </Link>
                                </Col>
                                <Col />
                                <Col xs={2}>
                                    <Link href="my-charts">
                                        <Button variant="danger" className="w-100">
                                            Cancel
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs={3} />
                            </Row>

                            <Modal show={show} onHide={handleClose} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        Oops
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Cannot prepare your chart. Your uploaded file contains errors.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>
                    </Col>
                </Row>
            </Container >
        </>
    );
}
