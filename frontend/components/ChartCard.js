import { Button, Card, Col } from "react-bootstrap";
import { chartDemoData } from "@/utils/chartTemplates";
import ChartComponent from "@/components/ChartComponent";

// A card, with the chart, and the chart title, and the price (optional). What else?
const ChartCard = ({ type, title, price }) => {
	const priceButton = <Col xs={4}>
		{/* One credit, many creditS. And that kids, is how we do the plural!
			(until we talk about geese, deer, oxen and moose that is...)
		*/}
		<Button variant="dark" className="w-100 mt-5">{price} credit{price === 1 ? "" : "s"}</Button>
	</Col>;

	return (
		<Card className="m-3" style={{ width: "25vw" }}>
			<Card.Body>
				<Card.Title className="mb-5">{title}</Card.Title>
				{/* Change maintainAspectRatio to false if you want to see the devil with your own eyes... */}
				<ChartComponent type={type} data={chartDemoData[type]} maintainAspectRatio={true} />
				{price ? priceButton : false}
			</Card.Body>
		</Card>
	);
};

export default ChartCard;
