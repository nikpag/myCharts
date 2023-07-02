const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
});

const producer = kafka.producer();

const main = async () => {
	await producer.connect();

	// CORS errors === Unhappy web devs
	app.use((req, res, next) => {
		res.set({
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type"
		});

		next();
	}, express.json());

	app.post(`/${process.env.URL_CHART_CREATE}`, (req, res) => {
		const { email, chartData } = req.body;

		const type = chartData.requestType;

		const topic = {
			line: process.env.KAFKA_TOPIC_CHART_CREATE_LINE_REQUEST,
			multi: process.env.KAFKA_TOPIC_CHART_CREATE_MULTI_AXIS_LINE_REQUEST,
			radar: process.env.KAFKA_TOPIC_CHART_CREATE_RADAR_REQUEST,
			scatter: process.env.KAFKA_TOPIC_CHART_CREATE_SCATTER_REQUEST,
			bubble: process.env.KAFKA_TOPIC_CHART_CREATE_BUBBLE_REQUEST,
			polar: process.env.KAFKA_TOPIC_CHART_CREATE_POLAR_AREA_REQUEST,
		}[type];

		// Just send the request...
		producer.send({
			topic: topic,
			messages: [
				{ key: email, value: JSON.stringify(chartData) }
			]
		});

		// ...and run!
		res.sendStatus(200);
	});

	app.listen(process.env.PORT, () => {
		console.log("Service frontend-adapter-upload is running");
	});
};

main();
