import Link from "next/link";
import { Button, Card } from "react-bootstrap";

export default function CreditsCard({ credits }) {
	return (
		<Card className="m-4" style={{ width: "20%" }}>
			<Card.Body>
				<Card.Title>
					{`${credits} credit${credits === "1" ? "" : "s"}`}
				</Card.Title>
				<Link href="#">
					<Button variant="dark" className="mt-5">
						Buy
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}
