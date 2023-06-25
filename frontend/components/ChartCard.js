import { Button, Card, Col, Row } from "react-bootstrap";

const ChartCard = ({ src, title, price }) => {
	const priceButton = <Col xs={4}>
		<Button variant="dark" className="w-100">{price} credit{price === 1 ? "" : "s"}</Button>
	</Col>;

	return (
		<Card className="m-3" style={{ width: "25vw" }}>
			<Card.Img className="mb-5" src={src} alt="" />
			<Card.Body>
				<Row>
					<Col>
						<Card.Title>{title}</Card.Title>
					</Col>
					{price ? priceButton : false}
				</Row>
			</Card.Body>
		</Card>
	);
};

export default ChartCard;
