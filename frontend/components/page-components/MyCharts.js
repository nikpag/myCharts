import Header from "@/components/Header";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Footer from "@/components/Footer";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ChartComponent from "@/components/ChartComponent";
import { saveAs } from "file-saver";
import chartToHTML from "@/utils/chartToHTML";

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

			// Sort from newer to older (descending by timestamp)
			json.sort((chart1, chart2) => {
				const [time1, date1] = chart1.createdOn.split(", ");
				const [time2, date2] = chart2.createdOn.split(", ");

				const date1ISO = date1.split("/").reverse().join("-");
				const date2ISO = date2.split("/").reverse().join("-");

				const formatted1 = `${date1ISO} ${time1}`;
				const formatted2 = `${date2ISO} ${time2}`;

				return formatted2.localeCompare(formatted1);
			});

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

				const json = await response.json();

				const base64String = json.data;

				const byteCharacters = atob(base64String);
				const byteNumbers = new Array(byteCharacters.length);

				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}

				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray]);

				saveAs(blob, `myChart.${fileType}`);

			}
			catch (error) {
				console.log("A network error was detected");
			}
		};
	};

	const handleDownloadToHTML = (i) => {
		return () => {
			const chart = chartList[i];

			const blob = new Blob([chartToHTML(chart)]);
			saveAs(blob, `myChart.html`);
		};
	};

	const toHTMLTable = (chartList) => {
		return chartList.map((chart, i) => {
			return <tr key={i} onClick={handleSelect(i)} style={{ backgroundColor: selected === i ? "lightgray" : "" }}>
				<td>{chart.displayType}</td>
				<td>{chart.chartName}</td>
				<td>{chart.createdOn}</td>
				<td>
					<Row>
						<Col xs={6} className="px-1">
							<Button onClick={handleDownload(chart.requestType, chart.id, "png")} className="px-0 py-1 w-100" variant="success">png</Button>
						</Col>
						<Col xs={6} className="px-1">
							<Button onClick={handleDownload(chart.requestType, chart.id, "pdf")} className="px-0 py-1 w-100" variant="danger">pdf</Button>
						</Col>
					</Row>
					<Row className="mt-1">
						<Col xs={6} className="px-1">
							<Button onClick={handleDownload(chart.requestType, chart.id, "svg")} className="px-0 py-1 w-100" variant="primary">svg</Button>
						</Col>
						<Col xs={6} className="px-1">
							<Button onClick={handleDownloadToHTML(i)} className="px-0 py-1 w-100" variant="warning">html</Button>
						</Col>
					</Row>
				</td>
			</tr >;
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
							{selected !== undefined ? <ChartComponent type={chartList[selected].requestType} data={chartList[selected]} maintainAspectRatio={false} /> : false}
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
