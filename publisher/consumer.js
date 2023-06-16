const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "consumer",
	brokers: ["localhost:9092"]
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
			console.log(JSON.parse(message.value).key1);
		}
	});
};

run().catch(e => console.error(`[kafka-consumer] ${e.message}`, e));
