import Link from "next/link";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Header from "../components/header";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NewUser = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p>Unauthorized</p>;
    }

    const handleContinue = async (email) => {
        const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/createUser`;
        const options = {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            }
        };

        // TODO Add a check for errors
        const response = await fetch(url, options);

        router.push("/account");
    };

    const handleNoThanks = async (email) => {
        const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/noThanks/${email}`;

        const response = await fetch(url);

        router.push("/");
    };

    return (
        <>
            <Header></Header>

            <Container>
                <Row className="my-5">
                    <h3>
                        This is the first time you are logging in with {session.user.email}
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
                        <Button onClick={() => { handleContinue(session.user.email); }} variant="success" className="w-75">
                            Continue
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => { handleNoThanks(session.user.email); }} variant="danger" className="w-75">
                            {/* TODO Delete user from database on no thanks, or implement continue endpoint differently */}
                            No, thanks
                        </Button>
                    </Col>
                    <Col xs={3} />
                </Row>
            </Container>
        </>
    );
};

export default NewUser;
