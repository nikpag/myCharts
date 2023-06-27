import Header from "./Header";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Image from "next/image";
import Footer from "./Footer";
import { signOut } from "next-auth/react";
// TODO Won't need this in the end, it's just to test the chart rendering. Remove at the end
import mockChartData from "./mockChartData";
import { useState } from "react";
import ChartComponent from "./ChartComponent";

const MyCharts = ({ setPage, data }) => {
	// TODO Make this fetch the appropriate endpoint
	// TODO This will probably need useEffect()
	const chartList = [
		{
			type: "line",
			chartName: "My line chart",
			// TODO Parse date correctly
			createdOn: "01-01-2021",
			download: {
				png: "http://downloadChart/id1/png",
				pdf: "http://downloadChart/id1/pdf",
				svg: "http://downloadChart/id1/svg",
			},
			data: mockChartData.line
		},
		{
			type: "polar",
			chartName: "My polar area chart",
			createdOn: "01-01-2022",
			download: {
				png: "http://downloadChart/id2/png",
				pdf: "http://downloadChart/id2/pdf",
				svg: "http://downloadChart/id2/svg",
			},
			data: mockChartData.polar
		},
		{
			type: "radar",
			chartName: "My radar chart",
			createdOn: "01-01-2023",
			download: {
				png: "http://downloadChart/id3/png",
				pdf: "http://downloadChart/id3/pdf",
				svg: "http://downloadChart/id3/svg",
			},
			data: mockChartData.radar
		}
	];

	const height = "60vh";

	const [selected, setSelected] = useState();

	const chartListToHTMLTable = (chartList) => {
		return chartList.map((chart, i) => {
			// TODO Maybe remove this on the outer scope with the other handlers
			const handleSelect = (i) => {
				return () => {
					setSelected(i);
				};
			};

			const handleDownload = (i, type) => {
				return () => {
					// TODO Make this fetch from an api
					console.log(i, type);
				};
			};

			return <tr key={i} onClick={handleSelect(i)} style={{ backgroundColor: selected === i ? "lightgray" : "" }}>
				<td>{chart.type}</td>
				<td>{chart.chartName}</td>
				<td>{chart.createdOn}</td>
				<td>
					{/* TODO Maybe support HTML option too? */}
					<Row>
						<Col className="px-1">
							{/* TODO Change button colors in the whole website to better convey meaning */}
							<Button onClick={handleDownload(i, "png")} className="px-0 py-1 w-100" variant="success">png</Button>
						</Col>
						<Col className="px-1">
							<Button onClick={handleDownload(i, "pdf")} className="px-0 py-1 w-100" variant="danger">pdf</Button>
						</Col>
						<Col className="px-1">
							<Button onClick={handleDownload(i, "svg")} className="px-0 py-1 w-100" variant="primary">svg</Button>
						</Col>
					</Row>
				</td>
			</tr>;
		});
	};

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
								{chartListToHTMLTable(chartList)}
							</tbody>
						</Table>
					</Col>
					<Col>
						<div className="border rounded" style={{ height: height }}>
							{selected !== undefined ? <ChartComponent type={chartList[selected].type} data={chartList[selected].data} inCard={false} /> : false}
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
