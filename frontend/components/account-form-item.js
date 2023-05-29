import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AccountFormItem({ labelText, id, value }) {
	return (
		<Form.Group>
			<Row className="mt-3">
				<Col xs={6} className="text-end">
					<Form.Label column htmlFor={id}>
						<h5>
							{labelText}
						</h5>
					</Form.Label>
				</Col>
				<Col xs={2}>
					<Form.Control id={id} type="text" value={value} readOnly />
				</Col>
			</Row>
		</Form.Group>
	);
}
