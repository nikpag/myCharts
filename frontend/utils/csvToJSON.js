
import { backgroundColors, borderColors } from "@/utils/colorPalette";

const csvToJSON = (csv, requestChartType) => {
	try {

		const jsonChartType = {
			line: "line",
			multi: "line",
			radar: "radar",
			scatter: "scatter",
			bubble: "bubble",
			polar: "polarArea",
		}[requestChartType];

		const displayChartType = {
			line: "line",
			multi: "multi axis line",
			radar: "radar",
			scatter: "scatter",
			bubble: "bubble",
			polar: "polar area",
		}[requestChartType];

		const json = {
			title: "",
			labels: [],
			datasets: [],
			type: jsonChartType,
			displayType: displayChartType,
			requestType: requestChartType,
			// TODO Put "Created on" here (or maybe elsewhere, for database etc.)
		};

		const step = {
			line: 1,
			multi: 2,
			radar: 1,
			scatter: 2,
			bubble: 3,
			polar: 1
		}[requestChartType];

		for (let i = 0; i < csv.length; i++) {
			const line = csv[i];

			if (i === 0) {
				json.title = line[0];
			}
			else if (i === 1) {
				for (let j = 1, datasetIndex = 0; j < line.length; j += step, datasetIndex++) {
					json.datasets[datasetIndex] = {
						label: line[j],
						data: [],
						backgroundColor: backgroundColors[datasetIndex % 7],
						borderColor: borderColors[datasetIndex % 7]
					};

					if (requestChartType === "line") {
						json.datasets[datasetIndex].yAxisID = "one";
					}
					else if (requestChartType === "multi") {
						json.datasets[datasetIndex].yAxisID = line[j + 1];
					}
					else if (requestChartType === "polar") {
						json.datasets[datasetIndex].backgroundColor = [];
						json.datasets[datasetIndex].borderColor = "white";
					}
				}
			}
			else {
				for (let j = 1, datasetIndex = 0; j < line.length; j += step, datasetIndex++) {
					// Applies to line, multi, radar, polar
					let dataPoint = line[j];

					if (requestChartType === "scatter") {
						dataPoint = { x: line[j], y: line[j + 1] };
					}
					else if (requestChartType === "bubble") {
						dataPoint = { x: line[j], y: line[j + 1], r: line[j + 2] };
					}
					else if (requestChartType === "polar") {
						// Count colors for CSV data lines only (i = 2,3,4,...)
						const colorIndex = i - 2;
						json.datasets[datasetIndex].backgroundColor.push(backgroundColors[colorIndex % 7]);
					}

					json.datasets[datasetIndex].data.push(dataPoint);
				}

				json.labels.push(line[0]);
			}
		}

		return json;
	}
	catch (error) {
		throw new Error("Chart contains errors!");
	}
};

export default csvToJSON;
