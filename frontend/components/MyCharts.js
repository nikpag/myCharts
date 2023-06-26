import Header from "./Header";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Image from "next/image";
import Footer from "./Footer";
import { signOut } from "next-auth/react";

const MyCharts = ({ setPage, data }) => {
	const height = "60vh";

	const handleMyAccount = () => {
		setPage("Account");
	};

	const handleLogout = () => {
		signOut();
	};

	return (
		<>
			<Header setPage={setPage} />

			<Container>
				<Row className="mt-5 mb-2">
					<Col xs={1}><h6>{data.user.email}</h6></Col>
					<Col xs={5} />
					<Col xs={3} className="text-start"><h4>My Charts</h4></Col>
					<Col className="text-end">
						<Button onClick={handleMyAccount} variant="dark" className="me-3">My account</Button>
						<Button onClick={handleLogout} variant="dark">Logout</Button>
					</Col>


				</Row>
				<Row>
					<Col xs={6} className="table-responsive" style={{ maxHeight: height }}>
						<Table hover>
							<thead className="table-secondary" style={{ position: "sticky", top: "0" }}>
								<tr>
									<th>Type</th>
									<th>Chart name</th>
									<th>Created on</th>
									<th>Download</th>
								</tr>
							</thead>
							<tbody>
								{/* TODO Make this dynamic */}
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
								<tr><td>Line</td></tr>
							</tbody>
						</Table>
					</Col>
					<Col>
						<div style={{ position: "relative", height: height }}>
							{/* TODO Make image src dynamic */}
							<Image className="border rounded" fill={true} src="/line.png" alt="" style={{ objectFit: "contain" }} />
						</div>
					</Col>
				</Row>

				<hr />

				<Footer setPage={setPage} />
			</Container >

		</>
	);
};

export default MyCharts;
