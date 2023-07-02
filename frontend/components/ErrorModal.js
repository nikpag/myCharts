import { Button, Modal } from "react-bootstrap";

// This modal stays dormant, until an error arises...
const ErrorModal = ({ show, setShow, text }) => {
	const handleHide = () => {
		setShow(false);
	};

	return (
		// Modals are so annoying, that the developer has provided the user with three ways to close this modal. It's like an anti-vim.
		// 1. onHide event
		<Modal show={show} onHide={handleHide} centered>
			{/* 2. A close button (X) on the top-right */}
			<Modal.Header closeButton>
				{/* Oops, because no error-maker in history exclaimed "Hooray!" */}
				<Modal.Title>
					Oops
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{text}
			</Modal.Body>
			<Modal.Footer>
				{/* 3. A CUSTOM BUTTON that handles closing */}
				<Button variant="dark" onClick={handleHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ErrorModal;
