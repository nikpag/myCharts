const csv = require("csv");
const fs = require("fs");

const csvFilePath = "bubble.csv";

let i = 0;
let chartData = {
	title: "",
	labels: [],
	datasets: [],
};

async function csvToChartData(callback) {
	await fs.createReadStream(csvFilePath)
		.pipe(csv.parse({ delimiter: "," }))
		.on("data", (data) => {
			if (i === 0) {
				chartData.title = data[0];
			}
			else if (i == 1) {
				for (let j = 1; j < data.length - 2; j += 3)
					chartData.datasets.push({
						label: data[j],
						data: []
					});
			}
			else {
				for (let j = 1; j < data.length - 2; j += 3) {
					let J = Math.floor(j / 3);
					chartData.datasets[J].data.push({ x: data[j], y: data[j + 1], r: data[j + 2] });
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
