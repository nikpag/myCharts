import { Button, Card, Col, Row } from "react-bootstrap";
import mockChartData from "./mockChartData";
import ChartComponent from "./ChartComponent";

const ChartCard = ({ type, title, price }) => {
	const priceButton = <Col xs={4}>
		<Button variant="dark" className="w-100 mt-5">{price} credit{price === 1 ? "" : "s"}</Button>
	</Col>;

	return (
		<Card className="m-3" style={{ width: "20vw" }}>
			<Card.Body>
				<Card.Title className="mb-5">{title}</Card.Title>
				<ChartComponent type={type} data={mockChartData[type]} inCard={true} />
				{price ? priceButton : false}
			</Card.Body>
		</Card>
	);
};

export default ChartCard;
