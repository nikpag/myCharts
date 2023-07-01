const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

const capitalizeFirstLetter = (string) => {
	return string.split("").map((c, i) => i === 0 ? c.toUpperCase() : c).join("");
};

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const charts = {};
const pictures = {};

const waitInterval = 100;

const main = async () => {
	await producer.connect();

	await consumer.subscribe({
		topics: [
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
			if (topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_LINE_RESPONSE
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

	app.use((req, res, next) => {
		res.set({
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type"
		});

		next();
	},
		express.json()
	);

	app.get(`/${process.env.URL_CHARTLIST_GET}/:email`, async (req, res) => {
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
			producer.send({
				topic: topic,
				messages: [
					{ value: email }
				],
			});
		}

		while (charts[email] === undefined ||
			charts[email].line === undefined || charts[email].multi === undefined || charts[email].radar === undefined ||
			charts[email].scatter === undefined || charts[email].bubble === undefined || charts[email].polar === undefined) {
			await new Promise(resolve => setTimeout(resolve, waitInterval));
		}

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

		res.send(JSON.stringify(chartList));

		charts[email] = undefined;
	});

	app.get(`/${process.env.URL_CHART_DOWNLOAD}/:chartType/:id/:fileType`, async (req, res) => {
		const { chartType, fileType, id } = req.params;

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

		while (pictures[chartType] === undefined
			|| pictures[chartType][id] === undefined
			|| pictures[chartType][id][fileType] === undefined) {
			await new Promise(resolve => setTimeout(resolve, waitInterval));
		}

		res.send(JSON.stringify({ data: pictures[chartType][id][fileType] }));

		pictures[chartType][id][fileType] = undefined;
	});

	app.listen(process.env.PORT, () => {
		console.log("Service frontend-adapter-download is running");
	});
};

main();
