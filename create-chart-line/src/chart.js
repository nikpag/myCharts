const csv = require("csv");
const fs = require("fs");

const csvFilePath = "line.csv";

let i = 0;
let chartData = {
	title: "",
	labels: [],
	datasets: [],
};

function csvToChartData() {
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
			return chartData;
		});
}

csvToChartData();
