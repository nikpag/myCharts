const { Kafka } = require("kafkajs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const { parse } = require("csv");

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const csvToJSON = (csv) => {
	return new Promise(resolve => {
		const chartType = process.env.CHART_TYPE;

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

			resolve(json);
		});
	});
};

const jsonToPictures = ({ title, type, ...data }) => {
	const result = {};

	// TODO Change hardcoded values;
	const width = 400;
	const height = 400;
	const backgroundColour = "white";

	const typePairs = [
		["png", "image/png"],
		["pdf", "application/pdf"],
		["svg", "image/svg+xml"],
	];

	for (const [fileType, mimeType] of typePairs) {
		const chartJSNodeCanvas = new ChartJSNodeCanvas({
			type: fileType,
			width,
			height,
			backgroundColour,
		});

		const options = {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: title,
				},
				colors: {
					enabled: true
				},
				legend: {
					labels: {
						pointBackgroundColor: "red"
					}
				}
			}
		};

		const configType = {
			"line": "line",
			"multi-axis-line": "line",
			"radar": "radar",
			"scatter": "scatter",
			"bubble": "bubble",
			"polar-area": "polarArea"
		}[type];

		const config = {
			type: configType,
			data: data,
			options: options,
		};

		result[fileType] = chartJSNodeCanvas.renderToBufferSync(config, mimeType);
	}

	return result;
};

const main = async () => {
	await producer.connect();

	await consumer.connect();
	await consumer.subscribe({
		topic: process.env.KAFKA_TOPIC_CREATE_CHART_REQUEST,
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			const csv = message.value.toString();

			const json = await csvToJSON(csv);

			const pictures = jsonToPictures(json);

			for (fileType in pictures) {
				pictures[fileType] = pictures[fileType].toString("base64");
			}

			await producer.send({
				topic: process.env.KAFKA_TOPIC_CREATE_CHART_RESPONSE,
				messages: [
					{ value: pictures.png }
				],
			});

			await producer.send({
				topic: process.env.KAFKA_TOPIC_SAVE_CHART_REQUEST,
				messages: [
					{ value: JSON.stringify(pictures) }
				]
			});
		}
	});
};

main();
