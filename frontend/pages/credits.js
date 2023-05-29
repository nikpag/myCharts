import Header from "../components/header";
import Link from "next/link";
import CreditsCard from "../components/credits-card";
import { Row, Col, Container, Button } from "react-bootstrap";

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
