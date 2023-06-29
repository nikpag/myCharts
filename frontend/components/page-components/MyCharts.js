import Header from "@/components/Header";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Footer from "@/components/Footer";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ChartComponent from "@/components/ChartComponent";

const MyCharts = ({ setPage, data }) => {
	const [chartList, setChartList] = useState();

	const fetchChartList = async () => {
		// Add kafka topics for this in the service-frontend-adapter
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_CHARTLIST_GET}/${data.user.email}`);

			if (!response.ok) {
				throw new Error("Network error");
			}

			const json = await response.json();

			setChartList(json);
		}
		catch (error) {
			console.log("A network error was detected.");
		}
	};

	useEffect(() => {
		fetchChartList();
	}, []);

	const height = "60vh";

	const [selected, setSelected] = useState();

	const handleSelect = (i) => {
		return () => {
			setSelected(i);
		};
	};

	const handleDownload = (chartType, id, fileType) => {
		return async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL_CHART_DOWNLOAD}/${chartType}/${id}/${fileType}`);

				if (!response.ok) {
					throw new Error("Network error");
				}
			}
			catch (error) {
				console.log("A network error was detected");
			}
		};
	};

	const toHTMLTable = (chartList) => {
		return chartList.map((chart, i) => {
			return <tr key={i} onClick={handleSelect(i)} style={{ backgroundColor: selected === i ? "lightgray" : "" }}>
				<td>{chart.displayType}</td>
				<td>{chart.chartName}</td>
				<td>{chart.createdOn}</td>
				<td>
					{/* TODO Maybe support HTML option too? */}
					<Row>
						<Col className="px-1">
							<Button onClick={handleDownload(chart.requestType, chart.id, "png")} className="px-0 py-1 w-100" variant="success">png</Button>
						</Col>
						<Col className="px-1">
							<Button onClick={handleDownload(chart.requestType, chart.id, "pdf")} className="px-0 py-1 w-100" variant="danger">pdf</Button>
						</Col>
						<Col className="px-1">
							<Button onClick={handleDownload(chart.requestType, chart.id, "svg")} className="px-0 py-1 w-100" variant="primary">svg</Button>
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
						<Button onClick={handleLogout} variant="danger">Logout</Button>
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
								{chartList !== undefined ? toHTMLTable(chartList) : false}
							</tbody>
						</Table>
					</Col>
					<Col>
						<div className="border rounded" style={{ height: height }}>
							{selected !== undefined ? <ChartComponent type={chartList[selected].type} data={chartList[selected].data} maintainAspectRatio={false} /> : false}
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
