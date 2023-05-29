import Header from "../components/header";
import Link from "next/link";
import { Row, Col, Button, Container } from "react-bootstrap";

export default function NewUser() {
    return (
        <>
            <Header></Header>

            <Container>
                <Row className="my-5">
                    <h3>
                        This is the first time you are logging in with (google account goes here)
                    </h3>
                </Row>
                <Row className="my-5">
                    <h4>
                        If you continue, your email will be stored in our user database, so you can store your created charts and purchase chart credits.
                    </h4>
                </Row>
                <Row>
                    <Col xs={3} />
                    <Col>
                        <Link href="/account">
                            <Button variant="success" className="w-75">
                                Continue
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link href="/">
                            <Button variant="danger" className="w-75">
                                No, thanks
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={3} />
                </Row>
            </Container>
        </>
    );
}
