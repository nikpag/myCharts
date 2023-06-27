
// TODO Move this to client-side if possible
// TODO There is no title showing! Maybe options/plugins is needed
// TODO Add keys other than data (options, etc). For example, axis positions in multiaxis
const csvToJSON = (csv, requestChartType) => {
	return new Promise(resolve => {
		const jsonChartType = {
			"line": "line",
			"multi": "line",
			"radar": "radar",
			"scatter": "scatter",
			"bubble": "bubble",
			"polar": "polarArea",
		}[requestChartType];

		const displayChartType = {
			"line": "line",
			"multi": "multi axis line",
			"radar": "radar",
			"scatter": "scatter",
			"bubble": "bubble",
			"polar": "polar area",
		}[requestChartType];

		// Chart.js color palette
		// TODO Remove code duplication here
		const backgroundColors = [
			"rgba(54, 162, 235, 0.5)",
			"rgba(255, 99, 132, 0.5)",
			"rgba(75, 192, 192, 0.5)",
			"rgba(255, 159, 64, 0.5)",
			"rgba(153, 102, 255, 0.5)",
			"rgba(255, 205, 86, 0.5)",
			"rgba(201, 203, 207, 0.5)",
		];

		const borderColors = [
			"rgba(54, 162, 235, 1)",
			"rgba(255, 99, 132, 1)",
			"rgba(75, 192, 192, 1)",
			"rgba(255, 159, 64, 1)",
			"rgba(153, 102, 255, 1)",
			"rgba(255, 205, 86, 1)",
			"rgba(201, 203, 207, 1)",
		];

		const json = {
			title: "",
			labels: [],
			datasets: [],
			type: jsonChartType,
			displayType: displayChartType,
			requestType: requestChartType,
			// TODO Put "Created on" here (or maybe elsewhere, for database etc.)
			// TODO Maybe add options here, for colors etc
		};


		const step = {
			"line": 1,
			"multi": 2,
			"radar": 1,
			"scatter": 2,
			"bubble": 3,
			"polar": 1
		}[requestChartType];

		for (const [i, line] of csv.entries()) {
			if (i === 0) {
				json.title = line[0];
			}
			else if (i === 1) {
				for (let j = 1, datasetIndex = 0; j < line.length; j += step, datasetIndex++) {
					// TODO Remove duplication, just add yAxisID prop, keep others in one place
					// TODO Handle multi-axis left and right axis
					if (requestChartType === "multi") {
						json.datasets.push({
							label: line[j],
							data: [],
							yAxisID: line[j + 1],
							backgroundColor: backgroundColors[datasetIndex % 7],
							borderColor: borderColors[datasetIndex % 7]
						});
					}
					// TODO Handle background color better for polar area chart (it needs a list)
					else if (requestChartType === "polar") {
						json.datasets.push({
							label: line[j],
							data: [],
							backgroundColor: [],
							borderColor: "white",
						});
					}
					else {
						json.datasets.push({
							label: line[j],
							data: [],
							backgroundColor: backgroundColors[datasetIndex % 7],
							borderColor: borderColors[datasetIndex % 7],
						});
					}
				}
			}
			else {
				// Don't use division for datasetIndex, use a counter instead (it's cleaner)
				for (let j = 1; j < line.length; j += step) {
					if (requestChartType === "line" || requestChartType === "radar" || requestChartType === "polar") {
						const datasetIndex = j - 1;

						json.datasets[datasetIndex].data.push(line[j]);

						// TODO Move this to a better place, so the logic is straighter
						if (requestChartType === "polar") {
							// TODO Organize this better
							const colorIndex = i - 2;
							json.datasets[datasetIndex].backgroundColor.push(backgroundColors[colorIndex % 7]);
						}
					}
					else if (requestChartType === "multi") {
						const datasetIndex = Math.floor(j / 2);

						json.datasets[datasetIndex].data.push(line[j]);
					}
					else if (requestChartType === "scatter") {
						const datasetIndex = Math.floor(j / 2);

						json.datasets[datasetIndex].data.push({
							x: line[j], y: line[j + 1]
						});
					}
					else if (requestChartType === "bubble") {
						const datasetIndex = Math.floor(j / 3);

						json.datasets[datasetIndex].data.push({
							x: line[j],
							y: line[j + 1],
							r: line[j + 2]
						});
					}
				}

				json.labels.push(line[0]);
			}
		}

		// console.dir(json, { depth: null });

		resolve(json);
	});
};

export default csvToJSON;
