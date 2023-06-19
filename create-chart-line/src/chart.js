const csv = require("csv");
const fs = require("fs");

const csvFilePath = "line.csv";

function csvToChartData(callback, csvFilePath) {

	let i = 0;
	let chartData = {
		title: "",
		labels: [],
		datasets: [],
	};

	fs.createReadStream(csvFilePath)
		.pipe(csv.parse({ delimiter: "," }))
		.on("data", (data) => {
			if (i === 0) {
				chartData.title = data[0];
			}
			else if (i == 1) {
				for (let datasetLabel of data.slice(1)) {
					chartData.datasets.push({
						label: datasetLabel,
						data: []
					});
				}
			}
			else {
				for (let [j, v] of data.slice(1).entries()) {
					chartData.datasets[j].data.push(v);
				}
				chartData.labels.push(data[0]);
			}
			i++;
		})
		.on("end", () => {
			console.log("onend, chartData title is..." + chartData.title);
			callback(chartData);
		})
		.on("error", (error) => {
			console.log(error);
		});
}

async function printChartData(csvFilePath, callback) {
	csvToChartData(data => callback(data), csvFilePath);
}

module.exports = printChartData;
