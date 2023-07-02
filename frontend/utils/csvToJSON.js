import { backgroundColors, borderColors } from "@/utils/colorPalette";

// This is the heart of the implementation. Given a CSV file, and the requested chart type,
// we return the JSON necessary to make the corresponding chart.js chart.
const csvToJSON = (csv, requestChartType) => {
	try {
		// The chart type as chart.js wants to see it
		const jsonChartType = {
			line: "line",
			multi: "line",
			radar: "radar",
			scatter: "scatter",
			bubble: "bubble",
			polar: "polarArea",
		}[requestChartType];

		// The chart type as the user wants to see it
		const displayChartType = {
			line: "line",
			multi: "multi axis line",
			radar: "radar",
			scatter: "scatter",
			bubble: "bubble",
			polar: "polar area",
		}[requestChartType];

		// All the stuff we will return eventually
		const json = {
			title: "",
			labels: [],
			datasets: [],
			type: jsonChartType,
			displayType: displayChartType,
			requestType: requestChartType,
			createdOn: new Date(),
		};

		// Data is spread on the pdf in different ways, depending on the chart type.
		// If you look at the example templates, you'll quickly guess why we configured these steps the way we did.
		// A little insight:
		// - In line, radar, and polar charts, we just look for the y values, that's why we don't skip anything
		// - In multi line axis charts, we also want the axis placement, that's why the data is 2 places apart
		// - In scatter charts, we are looking for x and y values, that's why we have a step of 2 (we need 2 data points)
		// - In bubble charts, we are looking for x, y, and r (radius) values, that's why we have a step of 3 (we need 3 data points)
		const step = {
			line: 1,
			multi: 2,
			radar: 1,
			scatter: 2,
			bubble: 3,
			polar: 1
		}[requestChartType];

		// Iterate over each line, and do different things depending on the line we are on:
		// - The first line (i==0) just has the chart title,
		// - The second line (i==1) defines the dataset labels,
		// - The rest of the lines describe the data points
		for (let i = 0; i < csv.length; i++) {
			const line = csv[i];

			if (i === 0) {
				json.title = line[0];
			}
			// The best explanation for lines 1,2,... (and they way I came up with the code anyway),
			// is to go to the chart templates defined in chartTemplates.js,
			// and play along with the code. You'll get the gist of it really quickly.
			// I'll try to provide some insight below regarding the tricky parts,
			// but you won't fully get it unless you play along.
			else if (i === 1) {
				// Iterate over each dataset definition (column), gathering metadata for the datasets first (such as datasetLabel, etc.)
				for (let j = 1, datasetIndex = 0; j < line.length; j += step, datasetIndex++) {
					// These attributes hold for all chart types
					json.datasets[datasetIndex] = {
						label: line[j],
						data: [],
						backgroundColor: backgroundColors[datasetIndex % 7],
						borderColor: borderColors[datasetIndex % 7]
					};

					// Line charts only have one axis
					if (requestChartType === "line") {
						json.datasets[datasetIndex].yAxisID = "one";
					}
					// Multi axis line charts have left and right axis (and the line[j+1] part captures exactly that left/right value)
					else if (requestChartType === "multi") {
						json.datasets[datasetIndex].yAxisID = line[j + 1];
					}
					// Polar area charts have a different background color for each data point,
					// and the white border color makes the chart more aesthetically pleasing
					else if (requestChartType === "polar") {
						json.datasets[datasetIndex].backgroundColor = [];
						json.datasets[datasetIndex].borderColor = "white";
					}
				}
			}
			else {
				// Iterate over the datapoints now, while holding a counter for which datasetIndex we are currently on
				for (let j = 1, datasetIndex = 0; j < line.length; j += step, datasetIndex++) {
					// Applies to line, multi, radar, polar, which need only one value per datapoint
					let dataPoint = line[j];

					// Applies to scatter, overrides previous value
					if (requestChartType === "scatter") {
						// Each datapoint needs two values for the scatter chart (x and y)
						dataPoint = { x: line[j], y: line[j + 1] };
					}
					// Applies to bubble, overrides previous value
					else if (requestChartType === "bubble") {
						// Each datapoint needs three values for the bubble chart (x, y and r -radius-)
						dataPoint = { x: line[j], y: line[j + 1], r: line[j + 2] };
					}
					else if (requestChartType === "polar") {
						// This part doesn't have to do with datapoints,
						// since dataPoints for polar chart have been correctly configured at this point.
						// It actually has to do with colors, and the fact that polar area charts are the only type
						// that needs one color per dataPOINT (as opposed to one color per dataSET)

						// This is an easy way to say:
						// If you are on line i = 2 of the CSV,
						// you are actually on the first data point of each dataset, that's why colorIndex = 0,
						// etc.
						const colorIndex = i - 2;
						json.datasets[datasetIndex].backgroundColor.push(backgroundColors[colorIndex % 7]);
					}

					// After all this conditional mumbo-jumbo, we eventually add the dataPoint to our dataset
					json.datasets[datasetIndex].data.push(dataPoint);
				}

				// On every data line we meet a new label, so why not take advantage of it?
				// This is the first CSV value of every data line
				json.labels.push(line[0]);
			}
		}

		// Phew, we are done! Return before it gets cold!
		return json;
	}
	catch (error) {
		// These kind of errors will give rise to the "Your chart template contains errors!" modal
		throw new Error("Chart contains errors!");
	}
};

export default csvToJSON;
