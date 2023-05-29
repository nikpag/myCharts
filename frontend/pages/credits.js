import Link from "next/link";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import CreditsCard from "../components/credits-card";
import Header from "../components/header";

export default function Credits() {
    return (
        <>
            <Header></Header>

            <Container>
                <Row className="mt-5">
                    <h3>
                        You are logged in as (google account goes here)
                    </h3>
                </Row>
                <Row className="d-flex flex-nowrap overflow-auto">
                    <CreditsCard credits="5" />
                    <CreditsCard credits="10" />
                    <CreditsCard credits="20" />
                    <CreditsCard credits="50" />
                </Row>
                <Row>
                    <Col xs={5}></Col>
                    <Col>
                        <Link href="account">
                            <Button variant="danger">
                                Cancel purchase
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
