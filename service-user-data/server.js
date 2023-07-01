const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");

const kafka = new Kafka({
	clientId: process.env.KAKFA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const main = async () => {
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

	await consumer.subscribe({
		topics: [
			process.env.KAFKA_TOPIC_CREDITS_UPDATE_REQUEST,
			process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST,
			process.env.KAFKA_TOPIC_NUMCHARTS_INCREMENT_REQUEST,
			process.env.KAFKA_TOPIC_USER_CREATE_REQUEST,
			process.env.KAFKA_TOPIC_USER_GET_REQUEST,
		],
		fromBeginning: true
	});

	await consumer.run({
		eachMessage: async ({ message, topic }) => {
			if (topic === process.env.KAFKA_TOPIC_CREDITS_UPDATE_REQUEST) {
				const email = message.key.toString();
				const credits = Number(message.value.toString());

				await User.findOneAndUpdate(
					{ email: email },
					{ $inc: { availableCredits: credits } }
				);

				const user = await User.findOne({ email: email });

				console.log("Credits are now:", user.availableCredits);
			}
			else if (topic === process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST) {
				const email = message.value.toString();

				await User.findOneAndUpdate(
					{ email: email },
					{ lastLogin: new Date() }
				);
			}
			else if (topic === process.env.KAFKA_TOPIC_NUMCHARTS_INCREMENT_REQUEST) {
				const email = message.value.toString();

				await User.findOneAndUpdate(
					{ email: email },
					{ $inc: { numberOfCharts: 1 } }
				);
			}
			else if (topic === process.env.KAFKA_TOPIC_USER_GET_REQUEST) {
				const email = message.value.toString();

				const user = await User.findOne({ email: email });

				producer.send({
					topic: process.env.KAFKA_TOPIC_USER_GET_RESPONSE,
					messages: [
						{ key: email, value: JSON.stringify(user) }
					]
				});
			}
			else if (topic === process.env.KAFKA_TOPIC_USER_CREATE_REQUEST) {
				const email = message.value.toString();

				const newUser = new User({
					email: email,
					numberOfCharts: 0,
					availableCredits: 0,
					lastLogin: new Date()
				});

				await newUser.save();
			}
		}
	});
};

main();
