const { Kafka } = require("kafkajs");

const express = require("express");
const app = express();

const kafka = new Kafka({
	// TODO Check if this makes any difference
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const main = async () => {
	await producer.connect();

	// CORS
	app.use(
		(req, res, next) => {
			res.set({
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Content-Type"
			});
			next();
		},
		express.json()
	);

	app.post("/buyCredits", (req, res) => {
		console.log(process.env.KAFKA_TOPIC_BUY_CREDITS_REQUEST);

		producer.send({
			topic: process.env.KAFKA_TOPIC_BUY_CREDITS_REQUEST,
			messages: [
				{ key: req.body.email, value: req.body.credits.toString() }
			]
		});

		res.sendStatus(200);
	});

	const users = {};

	await consumer.subscribe({
		topic: process.env.KAFKA_TOPIC_GET_USER_REPLY,
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message }) => {
			const email = message.key;
			const user = JSON.parse(message.value);

			users[email] = user;
		}
	});

	app.get("/getUser/:email", async (req, res) => {
		const email = req.params.email;

		await producer.send({
			topic: process.env.KAFKA_TOPIC_GET_USER_REQUEST,
			messages: [
				{ value: email }
			]
		});

		const waitInterval = 100;

		if (users[email] === undefined) {
			while (users[email] === undefined) {
				await new Promise(resolve => setTimeout(resolve, waitInterval));
			}
		}
		else {
			while (users[email] === null) {
				// TODO Eliminate duplicate code
				await new Promise(resolve => setTimeout(resolve, waitInterval));
			}
		}

		console.log("USERIS:", users[email]);

		res.send(users[email] === null ? {} : users[email]);
	});

	app.get("/insertUser", (req, res) => {

	});

	app.get("/getAllCharts", (req, res) => {

	});

	app.get("/getChartPreview", (req, res) => {

	});

	app.get("/uploadAndCreateChart", (req, res) => {

	});

	app.listen(process.env.PORT, () => {
		console.log(`Server is running on ${process.env.URL_BASE}`);
	});
};

main();
