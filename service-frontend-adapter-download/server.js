const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

// This is used for turning "bubble" to "Bubble", "line" to "Line" etc
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

// Since we are working asynchronously, and we don't want the universe to halt
// when we are waiting for responses (Javascript is single threaded), we store all responses regarding chart and picture data
// (that is, json and png/pdf/svg data accordingly) in these objects. This way, when we are looking if the charts for user
// user@gmail.com are ready, we just have to check if charts["user@gmail.com"] is not undefined
const charts = {};
const pictures = {};

// We don't want to have tight CPU loops, so we poll the objects we discussed above on regular intervals
const waitInterval = 100;

const main = async () => {
	await producer.connect();

	// Subscribe to anything that has to do with download, that is:
	// - Chart list get requests
	// - Chart download requests (as png, pdf, svg)
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

	// Process each message depending on the topic which it came from
	await consumer.run({
		eachMessage: async ({ topic, message }) => {
			if (topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_LINE_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_MULTI_AXIS_LINE_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_RADAR_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_SCATTER_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_BUBBLE_RESPONSE
				|| topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_POLAR_AREA_RESPONSE) {

				// Map each topic to its corresponding chart type
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

				// Parse all the JSON strings
				const chartList = chartListOfJsonStrings.map(jsonString => JSON.parse(jsonString));

				// Make sure we don't run into the dreaded "Cannot read properties of undefined" error
				if (charts[email] === undefined) {
					charts[email] = {};
				}

				// The answer is here, fresh out of the oven!
				charts[email][topicToChartType[topic]] = chartList;
			}
			else if (topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_LINE_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_MULTI_AXIS_LINE_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RADAR_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_SCATTER_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_BUBBLE_RESPONSE ||
				topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_POLAR_AREA_RESPONSE) {

				// Map each topic to its corresponding chart type
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

				// Make sure we don't run into the dreaded "Cannot read properties of undefined" error
				if (pictures[topicToChartType[topic]] === undefined) {
					pictures[topicToChartType[topic]] = {};
				}

				// Again...
				if (pictures[topicToChartType[topic]][id] === undefined) {
					pictures[topicToChartType[topic]][id] = {};
				}

				// Here is the answer, take it or leave it!
				pictures[topicToChartType[topic]][id][fileType] = data;
			}
		}
	});

	app.use((req, res, next) => {
		// We don't want CORS errors biting us...
		res.set({
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type"
		});

		next();
	}, express.json());

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

		// Ask all 6 chart store microservices, to get all charts for the particular user
		for (const topic of topics) {
			producer.send({
				topic: topic,
				messages: [
					{ value: email }
				],
			});
		}

		// Poll in regular intervals, not on a tight-CPU loop
		while (charts[email] === undefined ||
			charts[email].line === undefined || charts[email].multi === undefined || charts[email].radar === undefined ||
			charts[email].scatter === undefined || charts[email].bubble === undefined || charts[email].polar === undefined) {
			await new Promise(resolve => setTimeout(resolve, waitInterval));
		}

		// Once you get all your answers, spread them like butter on one big list
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

			// Start performing dreaded datetime manipulations...
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

		// Send the much needed data
		res.send(JSON.stringify(chartList));

		// Invalidate the response entry, so we can poll again if needed
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

		// Ask the appropriate microservice for your chart type
		producer.send({
			topic: topic,
			messages: [{
				key: id, value: fileType
			}]
		});

		// This response is gonna be: wait for it... (I know those back-to-back checks aren't the prettiest, but it works like a charm)
		while (pictures[chartType] === undefined
			|| pictures[chartType][id] === undefined
			|| pictures[chartType][id][fileType] === undefined) {
			await new Promise(resolve => setTimeout(resolve, waitInterval));
		}

		// Legendary!
		res.send(JSON.stringify({ data: pictures[chartType][id][fileType] }));

		// Invalidate as above
		pictures[chartType][id][fileType] = undefined;
	});

	app.listen(process.env.PORT, () => {
		console.log("Service frontend-adapter-download is running");
	});
};

main();
