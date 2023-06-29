import { Button, Modal } from "react-bootstrap";

const ErrorModal = ({ show, setShow, text }) => {
	const handleHide = () => {
		setShow(false);
	};

	return (
		<Modal show={show} onHide={handleHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					Oops
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{text}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="dark" onClick={handleHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ErrorModal;
