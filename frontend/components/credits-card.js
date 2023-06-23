import Link from "next/link";
import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CreditsCard = ({ credits, email }) => {
	const router = useRouter();

	const handleClick = async () => {
		const url = `${process.env.NEXT_PUBLIC_URL_FRONTEND_ADAPTER}/buyCredits`;
		const options = {
			method: "POST",
			body: JSON.stringify({ email, credits }),
			headers: {
				"Content-Type": "application/json",
			}
		};

		// TODO Add a check for errors
		const response = await fetch(url, options);

		router.push("/account");
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
};

export default CreditsCard;
