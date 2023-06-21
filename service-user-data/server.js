const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");

const app = require("express")();

const kafka = new Kafka({
	clientId: process.env.KAKFA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const main = async () => {
	// TODO Change authSource=admin
	await mongoose.connect(process.env.MONGO_URI);

	const userSchema = new mongoose.Schema({
		email: String,
		numberOfCharts: Number,
		availableCredits: Number,
		lastLogin: Date
	});

	const User = mongoose.model("User", userSchema);

	await producer.connect();

	await consumer.connect();

	// TODO Check what fromBeginning does
	await consumer.subscribe({ topic: process.env.KAFKA_SUBSCRIBE_TOPIC, fromBeginning: true });

	await consumer.run({
		eachMessage: async ({ message }) => {
			const email = message.value;

			const user = await User.findOne({ email: email });

			if (user === null) {
				const newUser = new User({
					email: email,
					numberOfCharts: 0,
					availableCredits: 0,
					lastLogin: Date().split(" ").slice(0, 5)
				});

				await newUser.save();

				console.log("USER SAVED", newUser);
			}

			producer.send({
				topic: process.env.KAFKA_SEND_TOPIC,
				messages: [
					{ key: email, value: JSON.stringify(user) }
				]
			});
		}
	});
};

main();
