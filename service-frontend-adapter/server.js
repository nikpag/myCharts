const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

// TODO Delete this later, this is just for mocking/testing
const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// TODO Keep this function?
const capitalizeFirstLetter = (string) => {
	return string.split("").map((c, i) => i === 0 ? c.toUpperCase() : c).join("");
};

// TODO Delete this later, this is just for mocking/testing
const mockChartData = {
	line: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => random(0, 100)),
				yAxisID: "one",
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => random(0, 100)),
				yAxisID: "one",
			}
		],
		title: "Line Chart",
		displayType: "line",
		requestType: "line",
		type: "line",
	},
	multi: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => random(-100, 100)),
				yAxisID: "left",
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => random(-100, 100)),
				yAxisID: "right",
			}
		],
		title: "Multi Axis Line Chart",
		displayType: "multi axis line",
		requestType: "multi",
		type: "line",
	},
	radar: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => random(-100, 100))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => random(-100, 100))
			}
		],
		title: "Radar Chart",
		displayType: "radar",
		requestType: "radar",
		type: "radar",
	},
	scatter: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => ({ x: random(-100, 100), y: random(-100, 100) }))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => ({ x: random(-100, 100), y: random(-100, 100) }))
			}
		],
		title: "Scatter Chart",
		displayType: "scatter",
		requestType: "scatter",
		type: "scatter",
	},
	bubble: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [
			{
				label: "2022",
				data: Array(7).fill(0).map(_ => ({ x: random(-50, 50), y: random(-50, 50), r: random(5, 20) }))
			},
			{
				label: "2023",
				data: Array(7).fill(0).map(_ => ({ x: random(-50, 50), y: random(-50, 50), r: random(5, 20) }))
			}
		],
		title: "Bubble Chart",
		displayType: "bubble",
		requestType: "bubble",
		type: "bubble",
	},
	polar: {
		labels: ["January", "February", "March", "April", "May"],
		datasets: [
			{
				label: "2023",
				data: Array(5).fill(0).map(_ => random(10, 100))
			}
		],
		title: "Polar Chart",
		displayType: "polar area",
		requestType: "polar",
		type: "polarArea",
	},
};

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const users = {};

const main = async () => {
	await producer.connect();

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

	// Update this to URL_USER_CREDITS_UPDATE (or similar)
	app.post(`/${process.env.URL_CREDITS_UPDATE}`, (req, res) => {
		const { email, credits } = req.body;

		console.log(process.env.KAFKA_TOPIC_CREDITS_UPDATE_REQUEST);

		producer.send({
			topic: process.env.KAFKA_TOPIC_CREDITS_UPDATE_REQUEST,
			messages: [
				{ key: email, value: credits.toString() }
			]
		});

		res.sendStatus(200);
	});

	// TODO Add getCredits endpoint
	app.get(`/${process.env.URL_USER_GET}/:email`, async (req, res) => {
		producer.send({
			topic: process.env.KAFKA_TOPIC_USER_GET_REQUEST,
			messages: [
				{ key: req.params.email }
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
				{ key: req.body.email }
			]
		});

		res.sendStatus(200);
	});

	// TODO Rename this to USER_LAST_LOGIN for hierarchy
	app.post(`/${process.env.URL_LAST_LOGIN_UPDATE}`, (req, res) => {
		producer.send({
			topic: process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST,
			messages: [
				{ key: req.body.email }
			]
		});

		res.sendStatus(200);
	});

	app.post(`/${process.env.URL_CHART_CREATE}`, (req, res) => {
		const { email, chartData } = req.body;

		console.log("FRONTEND ADAPTER, CHART DATA IS", chartData);

		const type = chartData.requestType;

		const topic = {
			line: process.env.KAFKA_TOPIC_CHART_CREATE_LINE_REQUEST,
			multi: process.env.KAFKA_TOPIC_CHART_CREATE_MULTI_AXIS_LINE_REQUEST,
			radar: process.env.KAFKA_TOPIC_CHART_CREATE_RADAR_REQUEST,
			scatter: process.env.KAFKA_TOPIC_CHART_CREATE_SCATTER_REQUEST,
			bubble: process.env.KAFKA_TOPIC_CHART_CREATE_BUBBLE_REQUEST,
			polar: process.env.KAFKA_TOPIC_CHART_CREATE_POLAR_AREA_REQUEST,
		}[type];

		producer.send({
			topic: topic,
			messages: [
				{ key: email, value: JSON.stringify(chartData) }
			]
		});

		res.sendStatus(200);
	});

	// Update this to URL_USER_NUMCHARTS_UPDATE (or something similar)
	app.post(`/${process.env.URL_NUMCHARTS_INCREMENT}/`, (req, res) => {
		console.log("MUST INCREMENT CHARTS BY ONE!");

		producer.send({
			topic: process.env.KAFKA_TOPIC_NUMCHARTS_INCREMENT_REQUEST,
			messages: [
				{ key: req.body.email }
			]
		});

		res.send("It's me!");
		// res.sendStatus(200);
	});

	// TODO Temporary function, shouldn't return immediately. It should publish and consume from kafka
	app.get(`/${process.env.URL_CHARTLIST_GET}/:email`, (req, res) => {
		console.log("Hit!");
		// TODO Should use email here

		const chartList = [
			{
				type: mockChartData.line.type,
				displayType: capitalizeFirstLetter(mockChartData.line.displayType),
				requestType: mockChartData.line.requestType,
				chartName: mockChartData.line.title,
				// TODO Parse date correctly
				createdOn: "01-01-2021",
				id: "0001",
				data: mockChartData.line,
			},
			{
				type: "polar",
				displayType: capitalizeFirstLetter(mockChartData.polar.displayType),
				requestType: mockChartData.polar.requestType,
				chartName: mockChartData.polar.title,
				createdOn: "01-01-2022",
				id: "0002",
				data: mockChartData.polar,
			},
			{
				type: "radar",
				displayType: capitalizeFirstLetter(mockChartData.radar.displayType),
				requestType: mockChartData.radar.requestType,
				chartName: mockChartData.radar.title,
				createdOn: "01-01-2023",
				id: "0003",
				data: mockChartData.radar,
			}
		];

		res.send(JSON.stringify(chartList));
	});

	app.get(`/${process.env.URL_CHART_DOWNLOAD}/:chartType/:id/:fileType`, (req, res) => {
		const { chartType, fileType, id } = req.params;

		console.log(`chartType:${chartType} fileType:${fileType} id:${id}`);

		res.sendStatus(200);
	});

	app.listen(process.env.PORT, () => {
		console.log("Service-frontend-adapter is running");
	});
};

main();
