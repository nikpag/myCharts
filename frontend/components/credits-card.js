import Link from "next/link";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function CreditsCard({ credits }) {
	return (
		<Card className="m-4" style={{ width: "20%" }}>
			<Card.Body>
				<Card.Title>
					{`${credits} credit${credits === "1" ? "" : "s"}`}
				</Card.Title>
				<Link href={`buyCredits/${credits}`}>
					<Button variant="dark" className="mt-5">
						Buy
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}
