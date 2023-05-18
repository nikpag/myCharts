const csv = require("csv");
const fs = require("fs");

const csvFilePath = "bubble.csv";

let i = 0;
let chartData = {
	title: "",
	datasets: []
};

fs.createReadStream(csvFilePath)
	.pipe(csv.parse({ delimiter: "," }))
	.on("data", (data) => {
		if (i === 0) {
			chartData.title = data[0];
		}
		else if (i == 1) {
			for (let j = 1; j < data.length - 2; j += 3)
				chartData.datasets.push({
					datasetLabel: data[j],
					data: []
				});
		}
		else {
			for (let j = 1; j < data.length - 2; j += 3) {
				let J = Math.floor(j / 3);
				chartData.datasets[J].data.push({ label: data[0], value: { x: data[j], y: data[j + 1], r: data[j + 2] } });
			}
		}
		i++;
	})
	.on("end", () => {
		for (item of chartData.datasets) {
			console.log(item.datasetLabel);
			console.log(item.data);
		}
	});
