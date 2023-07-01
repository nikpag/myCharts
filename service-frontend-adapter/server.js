const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

// TODO Keep this function?
const capitalizeFirstLetter = (string) => {
	return string.split("").map((c, i) => i === 0 ? c.toUpperCase() : c).join("");
};

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const users = {};
const charts = {};
const pictures = {};

const main = async () => {
	await producer.connect();

	await consumer.subscribe({
		topics: [
			process.env.KAFKA_TOPIC_USER_GET_RESPONSE,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_LINE_RESPONSE,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_MULTI_AXIS_LINE_RESPONSE,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_RADAR_RESPONSE,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_SCATTER_RESPONSE,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_BUBBLE_RESPONSE,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_POLAR_AREA_RESPONSE,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_LINE_RESPONSE,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_MULTI_AXIS_LINE_RESPONSE,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RADAR_RESPONSE,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_SCATTER_RESPONSE,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_BUBBLE_RESPONSE,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_POLAR_AREA_RESPONSE,
		],
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ topic, message }) => {
			if (topic === process.env.KAFKA_TOPIC_USER_GET_RESPONSE) {
				const email = message.key.toString();
				const user = JSON.parse(message.value.toString());

				users[email] = user;
			}
			// TODO Add other chart types here
			else if (topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_LINE_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_MULTI_AXIS_LINE_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_RADAR_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_SCATTER_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_BUBBLE_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_POLAR_AREA_RESPONSE) {

				const topicToChartType = {
					[process.env.KAFKA_TOPIC_CHARTLIST_GET_LINE_RESPONSE]: "line",
					[process.env.KAFKA_TOPIC_CHARTLIST_GET_MULTI_AXIS_LINE_RESPONSE]: "multi",
					[process.env.KAFKA_TOPIC_CHARTLIST_GET_RADAR_RESPONSE]: "radar",
					[process.env.KAFKA_TOPIC_CHARTLIST_GET_SCATTER_RESPONSE]: "scatter",
					[process.env.KAFKA_TOPIC_CHARTLIST_GET_BUBBLE_RESPONSE]: "bubble",
					[process.env.KAFKA_TOPIC_CHARTLIST_GET_POLAR_AREA_RESPONSE]: "polar",
				};

				const email = message.key.toString();
				const chartListOfJsonStrings = JSON.parse(message.value.toString());

				const chartList = chartListOfJsonStrings.map(jsonString => JSON.parse(jsonString));

				console.log("INSIDE TOPIC", chartList);

				if (charts[email] === undefined) {
					charts[email] = {};
				}

				charts[email][topicToChartType[topic]] = chartList;
			}
			else if (topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_LINE_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_MULTI_AXIS_LINE_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RADAR_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_SCATTER_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_BUBBLE_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_POLAR_AREA_RESPONSE) {

				const topicToChartType = {
					[process.env.KAFKA_TOPIC_CHART_DOWNLOAD_LINE_RESPONSE]: "line",
					[process.env.KAFKA_TOPIC_CHART_DOWNLOAD_MULTI_AXIS_LINE_RESPONSE]: "multi",
					[process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RADAR_RESPONSE]: "radar",
					[process.env.KAFKA_TOPIC_CHART_DOWNLOAD_SCATTER_RESPONSE]: "scatter",
					[process.env.KAFKA_TOPIC_CHART_DOWNLOAD_BUBBLE_RESPONSE]: "bubble",
					[process.env.KAFKA_TOPIC_CHART_DOWNLOAD_POLAR_AREA_RESPONSE]: "polar",
				};

				const id = message.key.toString();
				const { data, fileType } = JSON.parse(message.value.toString());

				if (pictures[topicToChartType[topic]] === undefined) {
					pictures[topicToChartType[topic]] = {};
				}

				if (pictures[topicToChartType[topic]][id] === undefined) {
					pictures[topicToChartType[topic]][id] = {};
				}

				pictures[topicToChartType[topic]][id][fileType] = data;
			}
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

	// TODO Rename this to USER_LAST_LOGIN for hierarchy
	app.post(`/${process.env.URL_LAST_LOGIN_UPDATE}`, (req, res) => {
		producer.send({
			topic: process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST,
			messages: [
				{ value: req.body.email }
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
				{ value: req.body.email }
			]
		});

		res.send("It's me!");
		// res.sendStatus(200);
	});

	app.get(`/${process.env.URL_CHARTLIST_GET}/:email`, async (req, res) => {
		console.log("Hit!");

		// const chartList = [
		// 	{
		// 		type: mockChartData.line.type,
		// 		displayType: capitalizeFirstLetter(mockChartData.line.displayType),
		// 		requestType: mockChartData.line.requestType,
		// 		chartName: mockChartData.line.title,
		// 		// TODO Parse date correctly
		// 		createdOn: "01-01-2021",
		// 		id: "0001",
		// 		data: mockChartData.line,
		// 	},
		// 	{
		// 		type: "polar",
		// 		displayType: capitalizeFirstLetter(mockChartData.polar.displayType),
		// 		requestType: mockChartData.polar.requestType,
		// 		chartName: mockChartData.polar.title,
		// 		createdOn: "01-01-2022",
		// 		id: "0002",
		// 		data: mockChartData.polar,
		// 	},
		// 	{
		// 		type: "radar",
		// 		displayType: capitalizeFirstLetter(mockChartData.radar.displayType),
		// 		requestType: mockChartData.radar.requestType,
		// 		chartName: mockChartData.radar.title,
		// 		createdOn: "01-01-2023",
		// 		id: "0003",
		// 		data: mockChartData.radar,
		// 	}
		// ];
		const email = req.params.email;

		const topics = [
			process.env.KAFKA_TOPIC_CHARTLIST_GET_LINE_REQUEST,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_MULTI_AXIS_LINE_REQUEST,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_RADAR_REQUEST,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_SCATTER_REQUEST,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_BUBBLE_REQUEST,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_POLAR_AREA_REQUEST,
		];

		for (const topic of topics) {
			console.log(`Sending to topic ${topic}`);
			producer.send({
				topic: topic,
				messages: [
					{ value: email }
				],
			});
		}

		console.log("Sent the kafka messages");

		// TODO Wait for all charts
		// TODO Should probably introduce a timeout here, as well as waiting for user data above
		// TODO Extract wait interval into a variable since it's being used in multiple places
		while (charts[email] === undefined ||
			charts[email].line === undefined || charts[email].multi === undefined || charts[email].radar === undefined ||
			charts[email].scatter === undefined || charts[email].bubble === undefined || charts[email].polar === undefined) {
			console.log("CHARTSEMAIL", charts[email]);
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		console.log('GOT OUT OF THE LOOP!');

		// TODO Add the other chart types
		const chartList = [
			...charts[email].line,
			...charts[email].multi,
			...charts[email].radar,
			...charts[email].scatter,
			...charts[email].bubble,
			...charts[email].polar,
		];


		// Prettify data before sending to frontend
		for (const chart of chartList) {
			chart.displayType = capitalizeFirstLetter(chart.displayType);
			chart.chartName = chart.title;

			// I hate datetime manipulations...
			const options = {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
				timeZone: "Europe/Athens"
			};

			const dateTime = (new Date(chart.createdOn)).toLocaleString("el-GR", options);

			chart.createdOn = dateTime.split(", ").reverse().join(", ");
		};

		console.log("INSIDE HANDLER", chartList);

		res.send(JSON.stringify(chartList));

		charts[email] = undefined;
	});

	app.get(`/${process.env.URL_CHART_DOWNLOAD}/:chartType/:id/:fileType`, async (req, res) => {
		const { chartType, fileType, id } = req.params;

		console.log(`chartType:${chartType} fileType:${fileType} id:${id}`);

		const topic = {
			line: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_LINE_REQUEST,
			multi: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_MULTI_AXIS_LINE_REQUEST,
			radar: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RADAR_REQUEST,
			scatter: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_SCATTER_REQUEST,
			bubble: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_BUBBLE_REQUEST,
			polar: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_POLAR_AREA_REQUEST,
		}[chartType];

		producer.send({
			topic: topic,
			messages: [{
				key: id, value: fileType
			}]
		});

		console.log(`Sent to topic ${topic}`);

		while (pictures[chartType] === undefined
			|| pictures[chartType][id] === undefined
			|| pictures[chartType][id][fileType] === undefined) {
			// TODO Extract waiting time to a variable to remove code duplication
			console.log("Waiting");
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		res.send(JSON.stringify({ data: pictures[chartType][id][fileType] }));

		pictures[chartType][id][fileType] = undefined;
	});

	app.listen(process.env.PORT, () => {
		console.log("Service-frontend-adapter is running");
	});
};

main();
