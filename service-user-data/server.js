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
	await consumer.subscribe({
		topics: [
			process.env.KAFKA_TOPIC_GET_USER_REQUEST,
			process.env.KAFKA_TOPIC_BUY_CREDITS_REQUEST,
			process.env.KAFKA_TOPIC_CREATE_USER_REQUEST,
			process.env.KAFKA_TOPIC_UPDATE_LAST_LOGIN_REQUEST,
		],
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message, topic }) => {
			if (topic === process.env.KAFKA_TOPIC_GET_USER_REQUEST) {
				const email = message.value;

				// console.log("USER-SERVICE-DATA: Need to find user", email);

				const user = await User.findOne({ email: email });

				producer.send({
					topic: process.env.KAFKA_TOPIC_GET_USER_REPLY,
					messages: [
						{ key: email, value: JSON.stringify(user) }
					]
				});
			}
			else if (topic === process.env.KAFKA_TOPIC_CREATE_USER_REQUEST) {
				const email = message.value;

				const newUser = new User({
					email: email,
					numberOfCharts: 0,
					availableCredits: 0,
					lastLogin: Date().split(" ").slice(0, 5)
				});

				console.log("THE DATE IS", Date());

				await newUser.save();

				console.log("USER SAVED", newUser);
			}
			else if (topic === process.env.KAFKA_TOPIC_BUY_CREDITS_REQUEST) {
				const email = message.key;
				const credits = Number(message.value);

				await User.findOneAndUpdate(
					{ email: email },
					{ $inc: { availableCredits: credits } }
				);

				const user = await User.findOne({ email: email });

				console.log("Credits are now:", user.availableCredits);
			}
			else if (topic === process.env.KAFKA_TOPIC_UPDATE_LAST_LOGIN_REQUEST) {
				const email = message.value;

				await User.findOneAndUpdate(
					{ email: email },
					{ lastLogin: Date().split(" ").slice(0, 5) }
				);
			}
		}
	});
};

main();
