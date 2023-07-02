import { Col, Form, Row } from "react-bootstrap";

// Each account data item is represented by one of these bad boys
const AccountItem = ({ label, value, id }) => {
	return (
		<Form.Group>
			<Row className="my-3">
				<Col xs={4} />
				<Col xs={2} className="text-end">
					<Form.Label column htmlFor={id}>
						<h5>{label}</h5>
					</Form.Label>
				</Col>
				<Col xs={2}>
					<Form.Control id={id} value={value} readOnly />
				</Col>
				<Col />
			</Row>
		</Form.Group>
	);
};

export default AccountItem;
