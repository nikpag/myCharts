const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "producer",
	brokers: ["localhost:9092"]
});

const producer = kafka.producer();

const run = async () => {
	await producer.connect();
	var i = 0;
	for (let j = 0; j < 5; j++) {
		await producer.send({
			topic: "ntua1",
			messages: [
				{ key: i.toString(), value: JSON.stringify({ key1: 1, key2: 2 }) }
			]
		});
		++i;
	}
};

run().catch(e => console.error(`[kafka-producer] ${e.message}`, e));
