const { Kafka } = require("kafkajs");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

// I get: chartData as JSON
// You get: a bunch of png, svg and pdf files (and your original JSON back)
// Seems like I'm getting ripped off here!
const jsonToPictures = (chartData) => {
	const result = {};

	const width = Number(process.env.CHART_WIDTH);
	const height = Number(process.env.CHART_HEIGHT);
	const backgroundColour = "white";

	// The first value is how ChartJSNodeCanvas wants to see the file types,
	// while the second value is how renderToBufferSync() wants to see the MIME types
	const typePairs = [
		["png", "image/png"],
		["pdf", "application/pdf"],
		["svg", "image/svg+xml"],
	];

	// For each file type
	for (const [fileType, mimeType] of typePairs) {
		// Make a canvas
		const chartJSNodeCanvas = new ChartJSNodeCanvas({
			type: fileType,
			width,
			height,
			backgroundColour,
		});

		// Give some axis options
		const scaleOptions = {
			// Line only has one axis
			line: {
				one: { type: "linear", display: true, position: "left" },
			},
			// Multi axis has left and right
			multi: {
				left: { type: "linear", display: true, position: "left" },
				right: { type: "linear", display: true, position: "right" },
			},
			// The others don't care
			radar: {},
			scatter: {},
			bubble: {},
			polar: {}
		};

		const options = {
			responsive: true,
			scales: scaleOptions[chartData.requestType],
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

		// This is where the magic happens
		result[fileType] = chartJSNodeCanvas.renderToBufferSync(config, mimeType);
	}

	// Return the original JSON for future reference
	result.json = JSON.stringify(chartData);

	return result;
};

const main = async () => {
	await producer.connect();

	await consumer.connect();
	// Wait for "Chart create requests"
	await consumer.subscribe({
		topic: process.env.KAFKA_TOPIC_CHART_CREATE_REQUEST,
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			const email = message.key.toString();

			const chartData = JSON.parse(message.value.toString());

			const pictures = jsonToPictures(chartData);

			for (const fileType in pictures) {
				pictures[fileType] = pictures[fileType].toString("base64");
			}

			// Announce that the chart has been correctly created.
			// We call that "Chart save request",
			// but note that there's no temporal coupling between topics
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
