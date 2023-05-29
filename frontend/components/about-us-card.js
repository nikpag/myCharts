import { Card } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function AboutUsCard({ src, title, text, credits }) {
	return (
		<Card className="m-4" style={{ width: "15vw" }}>
			<Card.Img variant="top" src={src} alt="" />
			<Card.Body>
				<Card.Title>
					{title}
				</Card.Title>
				<Card.Text>
					{text}
				</Card.Text>
				<Link href="#">
					<Button variant="dark">
						{credits} credit{credits === "1" ? "" : "s"}
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
}
