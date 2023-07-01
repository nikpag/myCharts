const { Kafka } = require("kafkajs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const jsonToPictures = (chartData) => {
	const result = {};

	const width = Number(process.env.CHART_WIDTH);
	const height = Number(process.env.CHART_HEIGHT);
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
			}
		};

		const config = {
			type: chartData.type,
			data: chartData,
			options: options,
		};

		result[fileType] = chartJSNodeCanvas.renderToBufferSync(config, mimeType);
	}

	// TODO Check if this is correct here, also make this more elegant/inclusive with the png/pdf/svg scheme
	result.json = JSON.stringify(chartData);

	return result;
};

const main = async () => {
	await producer.connect();

	await consumer.connect();
	await consumer.subscribe({
		topic: process.env.KAFKA_TOPIC_CHART_CREATE_REQUEST,
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			const email = message.key.toString();

			console.log("MESSAGE VALUE TO STRING: ", message.value.toString());

			const chartData = JSON.parse(message.value.toString());

			console.log("CHART CREATE LINE SAYS CHARTDATA IS", chartData);

			const pictures = jsonToPictures(chartData);

			for (const fileType in pictures) {
				pictures[fileType] = pictures[fileType].toString("base64");
			}

			await producer.send({
				topic: process.env.KAFKA_TOPIC_CHART_SAVE_REQUEST,
				messages: [
					{ key: email, value: JSON.stringify(pictures) }
				]
			});
		}
	});
};

main();
