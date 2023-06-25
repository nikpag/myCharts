// TODO This is not done, revisit after building "new-chart" page

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ErrorCreatingChart = ({ setPage }) => {

	// TODO This will probably go to the parent page (New-Chart)
	const [show, setShow] = useState(true);

	const handleShow = () => {

	};

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
				Cannot prepare your chart. Your uploaded file contains errors.
			</Modal.Body>
			<Modal.Footer>
				<Button variant="dark" onClick={handleHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ErrorCreatingChart;
