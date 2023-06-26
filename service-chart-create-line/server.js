const { Kafka } = require("kafkajs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const { parse } = require("csv");

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const jsonToPictures = (chartData) => {
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
					text: chartData.title,
				},
				colors: {
					enabled: true
				},
				// TODO Maybe remove this
				legend: {
					labels: {
						pointBackgroundColor: "red"
					}
				}
			}
		};


		const config = {
			type: chartData.type,
			data: chartData,
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
			// TODO Use this eventually
			const email = message.key.toString();

			console.log("MESSAGE VALUE TO STRING: ", message.value.toString());

			const chartData = JSON.parse(message.value.toString());

			console.log("CHART CREATE LINE SAYS CHARTDATA IS", chartData);

			const pictures = jsonToPictures(chartData);

			for (const fileType in pictures) {
				pictures[fileType] = pictures[fileType].toString("base64");
			}

			// TODO This is probably not needed anymore
			// await producer.send({
			// 	topic: process.env.KAFKA_TOPIC_CREATE_CHART_RESPONSE,
			// 	messages: [
			// 		{ value: pictures.png }
			// 	],
			// });

			console.log("CHART-CREATE-LINE SAYS PICTURE IS:", pictures.svg);

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
