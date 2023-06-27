const { Kafka } = require("kafkajs");
const multer = require("multer");
const express = require("express");
const fs = require("fs");
const app = express();

const kafka = new Kafka({
	// TODO Check if this makes any difference
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const users = {};

const upload = multer({ dest: "/uploads" });

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
		console.log(process.env.KAFKA_TOPIC_CREDITS_BUY_REQUEST);

		producer.send({
			topic: process.env.KAFKA_TOPIC_CREDITS_BUY_REQUEST,
			messages: [
				{ key: req.body.email, value: req.body.credits.toString() }
			]
		});

		res.sendStatus(200);
	});


	await consumer.subscribe({
		topic: process.env.KAFKA_TOPIC_USER_GET_REPLY,
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
		// console.log("Hit!");

		const email = req.params.email;

		await producer.send({
			topic: process.env.KAFKA_TOPIC_USER_GET_REQUEST,
			messages: [
				{ value: email }
			]
		});

		if (users[email] === undefined) {
			while (users[email] === undefined) {
				await new Promise(resolve => setTimeout(resolve, 100));
			}
		}

		const keep = users[email];

		users[email] = undefined;

		// console.log("USERIS:", keep);

		res.send(keep === null ? {} : keep);
	});

	app.post("/createUser", (req, res) => {
		// TODO Need to update last login on successful login (maybe in a different endpoint?)
		const email = req.body.email;

		console.log(email);

		producer.send({
			topic: process.env.KAFKA_TOPIC_USER_CREATE_REQUEST,
			messages: [
				{ value: email }
			]
		});

		res.sendStatus(200);
	});

	app.post("/updateLastLogin", (req, res) => {
		const email = req.body.email;

		producer.send({
			topic: process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST,
			messages: [
				{ value: email }
			]
		});

		res.sendStatus(200);
	});

	app.get("/noThanks/:email", async (req, res) => {
		// TODO This is probably not needed anymore
		users[req.params.email] = undefined;

		res.sendStatus(200);
	});

	app.get("/getAllCharts", (req, res) => {

	});

	app.get("/getChartPreview", (req, res) => {

	});

	app.post("/uploadAndCreateChart", (req, res) => {
		// TODO Use object destructuring here
		const email = req.body.email;
		const chartData = req.body.chartData;

		console.log("FRONTEND ADAPTER, CHART DATA IS", chartData);

		const type = chartData.requestType;

		const topic = {
			"line": process.env.KAFKA_TOPIC_CHART_CREATE_LINE_REQUEST,
			"multi": process.env.KAFKA_TOPIC_CHART_CREATE_MULTI_AXIS_LINE_REQUEST,
			"radar": process.env.KAFKA_TOPIC_CHART_CREATE_RADAR_REQUEST,
			"scatter": process.env.KAFKA_TOPIC_CHART_CREATE_SCATTER_REQUEST,
			"bubble": process.env.KAFKA_TOPIC_CHART_CREATE_BUBBLE_REQUEST,
			"polar": process.env.KAFKA_TOPIC_CHART_CREATE_POLAR_AREA_REQUEST,
		}[type];

		producer.send({
			topic: topic,
			messages: [
				{ key: email, value: JSON.stringify(chartData) }
			]
		});
	});

	app.listen(process.env.PORT, () => {
		console.log("Service-frontend-adapter is running");
	});
};

main();
