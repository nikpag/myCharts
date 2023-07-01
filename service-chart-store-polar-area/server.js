const mongoose = require('mongoose');
const { Kafka } = require("kafkajs");


const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

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
					//res.status(500).send('Failed to save file.');
				}
			}
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
			else if (topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_REQUEST) {
				const email = message.value.toString();

				const charts = await Chart.find({ username: email });

				const chartsJsonData = charts.map(chart => {
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
