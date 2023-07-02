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

// Every time I get a response regarding users, I put it in here.
// This way, I don't have to busy-wait for a response and stall everything.
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

	// The first time I ran into CORS, I googled it.
	// The second time I ran into CORS, I tried remembering, then I googled it.
	// The third time I ran into CORS, I became an Android developer.
	app.use((req, res, next) => {
		res.set({
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type"
		});

		next();
	}, express.json());

	app.post(`/${process.env.URL_CREDITS_UPDATE}`, (req, res) => {
		const { email, credits } = req.body;

		// Just request for a credits update, and that's it (let the others figure it out...)
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

		// Non-busy-wait polling, increase timeout for lower CPU usage
		while (users[email] === undefined) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		// If the user is null, it means I don't have it
		res.send(users[email] === null ? {} : users[email]);

		// Invalidate the users entry, so we can ask again later if needed
		users[email] = undefined;
	});

	app.post(`/${process.env.URL_USER_CREATE}`, (req, res) => {
		// Send
		producer.send({
			topic: process.env.KAFKA_TOPIC_USER_CREATE_REQUEST,
			messages: [
				{ value: req.body.email }
			]
		});

		// and run
		res.sendStatus(200);
	});

	app.post(`/${process.env.URL_LAST_LOGIN_UPDATE}`, (req, res) => {
		// Send
		producer.send({
			topic: process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST,
			messages: [
				{ value: req.body.email }
			]
		});

		// and run again
		res.sendStatus(200);
	});

	app.listen(process.env.PORT, () => {
		console.log("Service frontend-adapter-users is running");
	});
};

main();
