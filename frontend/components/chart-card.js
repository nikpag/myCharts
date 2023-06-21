import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ChartCard({ src, title, price }) {
	const priceButton = <Button variant="dark">
		{price} credit{price === 1 ? "" : "s"}
	</Button>;

	return (
		<Card className="m-4" style={{ width: "25vw" }}>
			<Card.Img variant="top" src={src} alt="" />
			<Card.Body>
				<Card.Title>
					{title}
				</Card.Title>
				{price ? priceButton : false}
			</Card.Body>
		</Card>
	);
}
