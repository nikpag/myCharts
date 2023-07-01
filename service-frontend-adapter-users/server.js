const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const users = {};

const main = async () => {
	await producer.connect();

	await consumer.subscribe({
		topics: [process.env.KAFKA_TOPIC_USER_GET_RESPONSE],
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ topic, message }) => {
			if (topic === process.env.KAFKA_TOPIC_USER_GET_RESPONSE) {
				const email = message.key.toString();
				const user = JSON.parse(message.value.toString());

				users[email] = user;
			}
		}
	});

	app.use((req, res, next) => {
		res.set({
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type"
		});

		next();
	},
		express.json()
	);

	app.post(`/${process.env.URL_CREDITS_UPDATE}`, (req, res) => {
		const { email, credits } = req.body;

		producer.send({
			topic: process.env.KAFKA_TOPIC_CREDITS_UPDATE_REQUEST,
			messages: [
				{ key: email, value: credits.toString() }
			]
		});

		res.sendStatus(200);
	});

	app.get(`/${process.env.URL_USER_GET}/:email`, async (req, res) => {
		const email = req.params.email;

		producer.send({
			topic: process.env.KAFKA_TOPIC_USER_GET_REQUEST,
			messages: [
				{ value: email }
			]
		});

		while (users[email] === undefined) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		res.send(users[email] === null ? {} : users[email]);

		users[email] = undefined;
	});

	app.post(`/${process.env.URL_USER_CREATE}`, (req, res) => {
		producer.send({
			topic: process.env.KAFKA_TOPIC_USER_CREATE_REQUEST,
			messages: [
				{ value: req.body.email }
			]
		});

		res.sendStatus(200);
	});

	app.post(`/${process.env.URL_LAST_LOGIN_UPDATE}`, (req, res) => {
		producer.send({
			topic: process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST,
			messages: [
				{ value: req.body.email }
			]
		});

		res.sendStatus(200);
	});

	app.listen(process.env.PORT, () => {
		console.log("Service frontend-adapter-users is running");
	});
};

main();
