import { Button } from "react-bootstrap";

const Footer = ({ setPage }) => {
	const handleClick = () => {
		setPage("AboutUs");
	};

	return (
		<footer>
			<Button onClick={handleClick} variant="secondary">About</Button>
		</footer>
	);

};

export default Footer;
