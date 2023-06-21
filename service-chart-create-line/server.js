const { Kafka } = require("kafkajs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fs = require("fs");
const { parse } = require("csv");

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const csvToJSON = (csv) => {
	let json = {
		title: "",
		labels: [],
		datasets: [],
	};

	parse(csv, (err, data) => {
		if (err) {
			// TODO Publish error to kafka
			console.log(err);
			return;
		}

		for (const [i, line] of data.entries()) {
			if (i === 0) {
				json.title = line[0];
			}
			else if (i === 1) {
				for (const datasetLabel of line.slice(1)) {
					json.datasets.push({
						label: datasetLabel,
						data: []
					});
				}
			}
			else {
				for (const [j, value] of line.slice(1).entries()) {
					json.datasets[j].data.push(value);
				}

				json.labels.push(line[0]);
			}
		}
	});

	return json;
};

// TODO Make this more general (png, pdf, svg etc.)
const jsonToPictures = ({ title, ...data }) => {
	const result = {};

	// TODO Change hardcoded values
	const width = 400;
	const height = 400;
	const backgroundColour = "white";

	const typePairs = [
		["png", "image/png"],
		["pdf", "application/pdf"],
		["svg", "image/svg+xml"],
	];

	// TODO Maybe type must be "image" instead of "png"/"jpeg"
	for (const [type, mimeType] of typePairs) {
		const chartJSNodeCanvas = new ChartJSNodeCanvas({
			type: type,
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
					// enabled: true
				},
				legend: {
					labels: {
						pointBackgroundColor: "red"
					}
				}
			}
		};

		const config = {
			type: "line",
			data: data,
			options: options,
		};

		result[type] = chartJSNodeCanvas.renderToBufferSync(config, mimeType);
	}

	return result;
};

const main = async () => {
	await producer.connect();

	await consumer.connect();
	await consumer.subscribe({
		topic: "test-topic", fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			const csv = message.value.toString();

			const json = csvToJSON(csv);

			// TODO Make this more general (png, pdf, svg etc.)
			const pictures = jsonToPictures(json);

			await producer.send({
				topic: "test-topic",
				messages: [
					{ value: pictures }
				],
			});
		}
	});
};

main();
