import { Button, Card } from "react-bootstrap";

// A card with one button, and how many credits will go into your account if you trust us enough to click it
const CreditsCard = ({ credits, onClick }) => {
	return (
		<Card className="my-5">
			<Card.Body>
				{/* One credit, many creditS! */}
				<Card.Title className="mb-5 text-center">{`${credits} credit${credits === 1 ? "" : "s"}`}</Card.Title>
				<Button onClick={onClick} variant="dark" className="mt-5 w-100">Buy</Button>
			</Card.Body>
		</Card>
	);
};

export default CreditsCard;
