import { Button, Card } from "react-bootstrap";

const CreditsCard = ({ credits, onClick }) => {
	return (
		<Card className="my-5">
			<Card.Body>
				<Card.Title className="mb-5 text-center">{`${credits} credit${credits === 1 ? "" : "s"}`}</Card.Title>
				<Button onClick={onClick} variant="dark" className="mt-5 w-100">Buy</Button>
			</Card.Body>
		</Card>
	);
};

export default CreditsCard;
