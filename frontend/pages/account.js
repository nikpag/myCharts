import Header from "../components/header";
import AccountFormItem from "../components/account-form-item";
import Link from "next/link";
import { Row, Col, Container, Button, Form } from "react-bootstrap";

export default function Account() {
  return (
    <>
      <Header></Header>

      <Container>
        <Row>
          <Col xs={4}></Col>
          <Col>
            <h3 className="my-5">
              Hello (google account goes here)
            </h3>
          </Col>
          <Col xs={3}></Col>
        </Row>

        <Form>
          <AccountFormItem
            labelText="Number of charts"
            id="numberOfCharts"
            value="1"
          />
          <AccountFormItem
            labelText="Available credits"
            id="availableCredits"
            value="2"
          />
          <AccountFormItem
            labelText="Last login"
            id="lastLogin"
            value="3"
          />
        </Form>

        <Row>
          <Col xs={4}></Col>
          <Col>
            <Link href="my-charts">
              <Button className="mt-5 w-100" variant="dark">
                My charts
              </Button>
            </Link>
          </Col>

          <Col>
            <Link href="new-chart">
              <Button className="mt-5 w-100" variant="dark">
                New chart
              </Button>
            </Link>
          </Col>

          <Col>
            <Link href="credits">
              <Button variant="dark" className="mt-5 w-100">
                Buy credits
              </Button>
            </Link>
          </Col>
          <Col xs={4}></Col>
        </Row>
      </Container>
    </>
  );
}
