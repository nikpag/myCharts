const csv = require("csv");
const fs = require("fs");

const csvFilePath = "polar-area.csv";

let i = 0;
let chartData = {
	title: "",
	datasets: []
};

fs.createReadStream(csvFilePath)
	.pipe(csv.parse({ delimiter: "," }))
	.on("data", (data) => {
		if (i === 0) {
			// console.log(i);
			chartData.title = data[0];
			// console.log(chartData);
		}
		else if (i == 1) {
			// console.log(i);
			for (let datasetLabel of data.slice(1)) {
				chartData.datasets.push({
					datasetLabel: datasetLabel,
					data: []
				});
			}
			// console.log(chartData);
		}
		else {
			// console.log(i);
			for (let [j, v] of data.slice(1).entries()) {
				chartData.datasets[j].data.push({ label: data[0], value: v });
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
