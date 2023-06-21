const csv = require("csv");
const fs = require("fs");

const csvFilePath = "multi-axis-line.csv";

let i = 0;
let chartData = {
	title: "",
	labels: [],
	datasets: [],
};

function csvToChartData(callback) {

	fs.createReadStream(csvFilePath)
		.pipe(csv.parse({ delimiter: "," }))
		.on("data", (data) => {
			console.log(i);
			if (i === 0) {
				chartData.title = data[0];
			}
			else if (i === 1) {
				for (let j = 1; j < data.length - 1; j += 2) {
					chartData.datasets.push({
						label: data[j],
						data: [],
						yAxisID: data[j + 1]
					});
				}
				console.log(chartData);
			}
			else {
				for (let j = 1; j < data.length - 1; j += 2) {
					let J = Math.floor(j / 2);
					chartData.datasets[J].data.push(data[j]);
				}
				chartData.labels.push(data[0]);
			}
			i++;
		})
		.on("end", () => {
			callback(chartData);
		})
		.on("error", (error) => {
			console.log(error);
		});
}

csvToChartData(data => console.dir(data, { depth: null }));
