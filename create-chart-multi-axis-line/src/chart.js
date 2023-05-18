const csv = require("csv");
const fs = require("fs");

const csvFilePath = "multi-axis-line.csv";

let i = 0;
let chartData = {
	title: "",
	datasets: []
};

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
					datasetLabel: data[j],
					data: [],
					axis: data[j + 1]
				});
			}
			console.log(chartData);
		}
		else {
			for (let j = 1; j < data.length - 1; j += 2) {
				let J = Math.floor(j / 2);
				chartData.datasets[J].data.push({ label: data[0], value: data[j] });
			}
			// console.log(chartData);
		}
		i++;
	})
	.on("end", () => {
		for (item of chartData.datasets) {
			console.log(item);
		}
	});
