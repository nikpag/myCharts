const mongoose = require('mongoose');
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

// How a chart is saved on the database.
// While it seems innocent, don't forget that there is a lot of metadata
// hidden in the json_data value
const chartSchema = new mongoose.Schema({
	username: String,
	png: String,
	pdf: String,
	svg: String,
	json_data: String,
});

const Chart = mongoose.model("chart", chartSchema);

const main = async () => {
	await mongoose.connect(process.env.MONGO_URI);

	await producer.connect();

	await consumer.subscribe({
		topics: [
			process.env.KAFKA_TOPIC_CHART_SAVE_REQUEST,
			process.env.KAFKA_TOPIC_CHARTLIST_GET_REQUEST,
			process.env.KAFKA_TOPIC_CHART_DOWNLOAD_REQUEST,
		],
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ topic, message, }) => {
			// We have to get the chart data and save it.
			// Here, the user is represented by his email,
			// while the value represents all the data that must be saved
			if (topic === process.env.KAFKA_TOPIC_CHART_SAVE_REQUEST) {
				const user = message.key.toString();
				const value = JSON.parse(message.value.toString());
				const png_data = value.png;
				const pdf_data = value.pdf;
				const svg_data = value.svg;
				const json_data = value.json;

				try {
					const newChart = new Chart({
						username: user,
						png: png_data,
						pdf: pdf_data,
						svg: svg_data,
						json_data: json_data,
					});

					await newChart.save();
				}
				catch (error) {
					console.error('Failed to save file:', error);
				}
			}
			// Someone wants to download a chart as png, pdf or svg.
			// We find it, attach its filetype on it (so the frontend knows the file extension with which to save the file),
			// and publish it to the corresponding response topic (again, no temporal coupling between topics,
			// names are just for the developer's convenience)
			else if (topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_REQUEST) {
				const id = message.key.toString();
				const fileType = message.value.toString();

				const chart = await Chart.findOne({ _id: id });

				const response = { data: chart[fileType], fileType: fileType };

				await producer.send({
					topic: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RESPONSE,
					messages: [
						{ key: id, value: JSON.stringify(response) }
					]
				});
			}
			// Someone wants to get all charts of a particular user, as a list of JSON.
			// We don't return the png, svg and pdf values, just the JSON data,
			// in order to make the payload (much) smaller.
			// Again, no temporal coupling between request/response topics,
			// we name them that just for convenience
			else if (topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_REQUEST) {
				const email = message.value.toString();

				const charts = await Chart.find({ username: email });

				const chartsJsonData = charts.map(chart => {
					// We bundle the chart's mongo id together with its data,
					// so the user can refer to a specific chart later, when they want to download it
					// as png, pdf or svg
					return JSON.stringify({ id: chart._id.toString(), ...JSON.parse(chart.json_data) });
				});

				await producer.send({
					topic: process.env.KAFKA_TOPIC_CHARTLIST_GET_RESPONSE,
					messages: [
						{ key: email, value: JSON.stringify(chartsJsonData) }
					]
				});
			}
		}
	});
};

main();
