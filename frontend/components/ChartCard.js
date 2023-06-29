import { Button, Card, Col } from "react-bootstrap";
import { chartDemoData } from "@/utils/chartTemplates";
import ChartComponent from "@/components/ChartComponent";

const ChartCard = ({ type, title, price }) => {
	const priceButton = <Col xs={4}>
		<Button variant="dark" className="w-100 mt-5">{price} credit{price === 1 ? "" : "s"}</Button>
	</Col>;

	return (
		<Card className="m-3" style={{ width: "25vw" }}>
			<Card.Body>
				<Card.Title className="mb-5">{title}</Card.Title>
				<ChartComponent type={type} data={chartDemoData[type]} maintainAspectRatio={true} />
				{price ? priceButton : false}
			</Card.Body>
		</Card>
	);
};

export default ChartCard;
