const multer = require("multer");
const fs = require("fs");
const { parse } = require("csv");


const upload = multer({ dest: "/uploads" });

export const config = {
	api: {
		bodyParser: false, // Disable the built-in Next.js bodyParser
	},
};

const csvToJSON = (csv) => {
	return new Promise(resolve => {
		const chartType = "line";

		const json = {
			title: "",
			labels: [],
			datasets: [],
			type: chartType
		};

		parse(csv, (err, data) => {
			if (err) {
				// TODO Publish error to kafka
				console.log(err);
				return;
			}

			const step = {
				"line": 1,
				"multi-axis-line": 2,
				"radar": 1,
				"scatter": 2,
				"bubble": 3,
				"polar-area": 1
			}[chartType];

			for (const [i, line] of data.entries()) {
				if (i === 0) {
					json.title = line[0];
				}
				else if (i === 1) {
					for (let j = 1; j < line.length; j += step) {
						if (chartType === "multi-axis-line") {
							json.datasets.push({
								label: line[j],
								data: [],
								yAxisID: line[j + 1]
							});
						}
						else {
							json.datasets.push({
								label: line[j],
								data: []
							});
						}
					}
				}
				else {
					for (let j = 1; j < line.length; j += step) {
						if (chartType === "line" || chartType === "radar" || chartType === "polar-area") {
							const datasetIndex = j - 1;

							json.datasets[datasetIndex].data.push(line[j]);
						}
						else if (chartType === "multi-axis-line") {
							const datasetIndex = Math.floor(j / 2);

							json.datasets[datasetIndex].data.push(line[j]);
						}
						else if (chartType === "scatter") {
							const datasetIndex = Math.floor(j / 2);

							json.datasets[datasetIndex].data.push({
								x: line[j], y: data[j + 1]
							});
						}
						else if (chartType === "bubble") {
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

			console.dir(json, { depth: null });

			resolve(json);
		});
	});
};

const handler = (req, res) => {
	let data = null;

	upload.single("file")(req, res, async (err) => {
		if (err) {
			return res.status(400).json({ error: err.message });
		}

		console.log(req.file.path);

		data = fs.readFileSync(req.file.path).toString("utf8");

		res.send(await csvToJSON(data));
	});
};

export default handler;
