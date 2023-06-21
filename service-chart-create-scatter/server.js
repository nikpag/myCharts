const csv = require("csv");
const fs = require("fs");

const csvFilePath = "scatter.csv";

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
			if (i === 0) {
				chartData.title = data[0];
			}
			else if (i == 1) {
				for (let j = 1; j < data.length - 1; j += 2)
					chartData.datasets.push({
						label: data[j],
						data: []
					});
			}
			else {
				for (let j = 1; j < data.length - 1; j += 2) {
					let J = Math.floor(j / 2);
					chartData.datasets[J].data.push({ x: data[j], y: data[j + 1] });
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
		});;
}

csvToChartData(data => console.dir(data, { depth: null }));
