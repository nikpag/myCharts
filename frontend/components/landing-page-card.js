import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function LandingPageCard({ title, src }) {
	return (
		<Card className="m-4" style={{ width: "20%" }}>
			<Card.Img src={src} alt="" />
			<Card.Body>
				<Card.Title>
					{title}
				</Card.Title>
			</Card.Body>
		</Card>
	);
}
