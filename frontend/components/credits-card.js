import Link from "next/link";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function CreditsCard({ credits, email }) {
	const handleClick = () => {
		const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/buyCredits`;
		const options = {
			method: "POST",
			body: JSON.stringify({ email, credits }),
			headers: {
				"Content-Type": "application/json",
			}
		};

		fetch(url, options)
			.then((what) => {
				// TODO redirect to account page, showing updated credits
				console.log(what);
			})
			.catch((err) => {
				// TODO redirect to account page, showing the error
				console.log(err);
			});
	};

	return (
		<Card className="m-4" style={{ width: "20%" }}>
			<Card.Body>
				<Card.Title>
					{`${credits} credit${credits === 1 ? "" : "s"}`}
				</Card.Title>
				<Button onClick={handleClick} variant="dark" className="mt-5">
					Buy
				</Button>
			</Card.Body>
		</Card>
	);
}
