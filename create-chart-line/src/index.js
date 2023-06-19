const { Kafka } = require("kafkajs");
const fs = require("fs");
const printChartData = require("./chart");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const kafka = new Kafka({
	clientId: "consumer",
	brokers: ["broker:9092"]
});

const consumer = kafka.consumer({ groupId: "my-consumer-group" });

const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

errorTypes.map(type => {
	process.on(type, async e => {
		try {
			console.log(`process.on ${type}`);
			console.error(e);
			await consumer.disconnect();
			process.exit(0);
		} catch (_) {
			process.exit(1);
		}
	});
});

signalTraps.map(type => {
	process.once(type, async () => {
		try {
			await consumer.disconnect();
		} finally {
			process.kill(process.pid, type);
		}
	});
});

const run = async () => {
	await consumer.connect();
	await consumer.subscribe({ topic: "ntua1" });
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
			const payload = `- ${prefix} ${message.key}#${message.value}`;

			const csvData = message.value.toString();

			const filePath = "savedFiles/file.csv";

			fs.writeFile(filePath, csvData, (error) => {
				if (error) {
					console.error("An error occurred:", error);
				}
				else {
					console.log("String saved successfully!");
				}
			});



			printChartData(filePath, (data) => {
				console.log("The data title is... " + data.title);

				const { title, ...chartData } = data;

				console.log("My chart data is...", chartData);

				const width = 400; //px
				const height = 400; //px
				const backgroundColour = 'white';
				const chartJSNodeCanvas = new ChartJSNodeCanvas({ type: "pdf", width, height, backgroundColour });

				(async () => {
					const configuration = {
						type: 'line',
						data: chartData,
						options: {
							responsive: true,
							plugins: {
								title: {
									display: true,
									text: 'Line Chart'
								},
								colors: {
									// enabled: true,
								},
								legend: {
									labels: {
										pointBackgroundColor: "red"
									}
								}
							}
						},
					};

					const pdf = chartJSNodeCanvas.renderToBufferSync(configuration, "application/pdf");

					fs.writeFile("savedFiles/result.pdf", pdf, 'base64', (err) => {
						console.log(err);
					});
				})();
			});
		}
	});
};

run().catch(e => console.error(`[kafka-consumer] ${e.message}`, e));
