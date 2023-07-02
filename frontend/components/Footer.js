import { Button } from "react-bootstrap";

// A Footer
// that contains a footer
// that contains a button
// that calls a function
// that redirects to a page
// that tells you about an app
// that enables you to click buttons
// that enable you to upload files
// that describe charts
// and it just so happens
// that one of these buttons
// is a button
// that is contained in a Footer
// that contains a footer
// that contains a button...
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
