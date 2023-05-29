import Image from "next/image";
import { Card, Button } from "react-bootstrap";

export default function LandingPageCard({ title, text, buttonText, src }) {
	return (
		<Card className="m-4" style={{ width: "20%" }}>
			<Card.Img src={src} alt="" />
			<Card.Body>
				<Card.Title>
					{title}
				</Card.Title>
				<Card.Text className="card-text">
					{text}
				</Card.Text>
				<Card.Link href="#" variant="">
					<Button variant="dark">
						{buttonText}
					</Button>
				</Card.Link>
			</Card.Body>
		</Card>
	);
}
