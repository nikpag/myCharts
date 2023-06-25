import Link from "next/link";
import { Button } from "react-bootstrap";

const Footer = ({ setPage }) => {
	const handleClick = () => {
		setPage("AboutUs");
	};

	return (
		<footer>
			<Button onClick={handleClick} variant="dark">About</Button>
		</footer>
	);

};

export default Footer;
