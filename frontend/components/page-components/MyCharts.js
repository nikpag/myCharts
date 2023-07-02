import Header from "@/components/Header";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Footer from "@/components/Footer";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import ChartComponent from "@/components/ChartComponent";
import { saveAs } from "file-saver";
import chartToHTML from "@/utils/chartToHTML";

// Here, the user can see a list of his charts, as well as previews for every chart.
// Each chart can be downloaded as png, pdf, svg or html.
// png, pdf and svg downloads are handled by our chart-store microservices (one for each chart type),
// while the html downloads are handled on the client side.
// html downloads are better suited for the client side, since we have already received the JSON descriptions for all the charts,
// as we need these JSON descriptions in order to handle the chart preview rendering.
// This way, we don't have to send in more data than we need (png, pdf and svg files are sent from the server to the client on request).
const MyCharts = ({ setPage, data }) => {
	const [chartList, setChartList] = useState();

	const fetchChartList = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL_CHARTLIST_GET}/${data.user.email}`);

			if (!response.ok) {
				throw new Error("Network error");
			}

			const json = await response.json();

			// Because the chart list comes from 6 different microservices, one for each chart type,
			// we have to sort the results. We choose to sort from newer to older,
			// as is natural in such an application. The sorting is done on the client side,
			// so it's not taxing on our microservices.
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

	// useEffect runs when the component mounts
	useEffect(() => {
		fetchChartList();
	}, []);

	// How tall to make the HTML table, as well as the canvas for the chart preview
	const height = "60vh";

	// This variable changes every time the user clicks on a table item,
	// causing the chart preview to update,
	// as well as highlighting the selected table item,
	// for better user feedback.
	const [selected, setSelected] = useState();

	// Using javascript closures for this
	const handleSelect = (i) => {
		return () => {
			setSelected(i);
		};
	};

	// We specify which chart type we want, which file type we want, as well as the chart id, so the respective microservice can find it
	// This applies to png, pdf and svg downloads
	const handleDownload = (chartType, id, fileType) => {
		return async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL_CHART_DOWNLOAD}/${chartType}/${id}/${fileType}`);

				if (!response.ok) {
					throw new Error("Network error");
				}

				const json = await response.json();

				// The resulting json is of the form '{"data": <base 64 data>}'
				const base64String = json.data;

				// We convert the string to binary
				const byteCharacters = atob(base64String);
				const byteNumbers = new Array(byteCharacters.length);

				// We add each ascii code of the string to an array
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}

				// We convert the array to a blob, in order to use the saveAs() function from the file-saver npm package
				const byteArray = new Uint8Array(byteNumbers);
				const blob = new Blob([byteArray]);

				// This saves it directly to the users Downloads folder (or whatever "file saving folder" the browser has been configured with)
				saveAs(blob, `myChart.${fileType}`);
			}
			catch (error) {
				console.log("A network error was detected");
			}
		};
	};

	// This applies to html downloads, and is handled on the client side, as we said above
	// We call the custom chartToHTML() function on whichever chart corresponds to the button we click
	const handleDownloadToHTML = (i) => {
		return () => {
			const chart = chartList[i];

			const blob = new Blob([chartToHTML(chart)]);
			saveAs(blob, `myChart.html`);
		};
	};

	// Takes the chart list metadata and converts to an HTML table for better visualization by the user.
	// Also registers button handlers etc.
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

	// Navigate to account page
	const handleMyAccount = () => {
		setPage("Account");
	};

	// Use signOut() function from next-auth. The rest is handled by the top-level Page() component (index.js file)
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
							{/* The table head is always the same and is rendered as-is */}
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
						{/* If no chart has been selected, the chart preview is empty. Otherwise, the selected chart is rendered. */}
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
