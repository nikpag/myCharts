const { Kafka } = require("kafkajs");
const mongoose = require("mongoose");

const kafka = new Kafka({
	clientId: process.env.KAKFA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER],
	retries: process.env.KAFKA_NUM_RETRIES,
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
			process.env.KAFKA_TOPIC_USER_CREATE_REQUEST,
			process.env.KAFKA_TOPIC_USER_GET_REQUEST,
			process.env.KAFKA_TOPIC_CHART_SAVE_LINE_REQUEST,
			process.env.KAFKA_TOPIC_CHART_SAVE_MULTI_AXIS_LINE_REQUEST,
			process.env.KAFKA_TOPIC_CHART_SAVE_RADAR_REQUEST,
			process.env.KAFKA_TOPIC_CHART_SAVE_SCATTER_REQUEST,
			process.env.KAFKA_TOPIC_CHART_SAVE_BUBBLE_REQUEST,
			process.env.KAFKA_TOPIC_CHART_SAVE_POLAR_AREA_REQUEST,
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
			}
			else if (topic === process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST) {
				const email = message.value.toString();

				await User.findOneAndUpdate(
					{ email: email },
					{ lastLogin: new Date() }
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
			else if (topic === process.env.KAFKA_TOPIC_CHART_SAVE_LINE_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_MULTI_AXIS_LINE_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_RADAR_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_SCATTER_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_BUBBLE_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_POLAR_AREA_REQUEST) {

				const credits = Number({
					[process.env.KAFKA_TOPIC_CHART_SAVE_LINE_REQUEST]: 1,
					[process.env.KAFKA_TOPIC_CHART_SAVE_MULTI_AXIS_LINE_REQUEST]: 2,
					[process.env.KAFKA_TOPIC_CHART_SAVE_RADAR_REQUEST]: 4,
					[process.env.KAFKA_TOPIC_CHART_SAVE_SCATTER_REQUEST]: 2,
					[process.env.KAFKA_TOPIC_CHART_SAVE_BUBBLE_REQUEST]: 3,
					[process.env.KAFKA_TOPIC_CHART_SAVE_POLAR_AREA_REQUEST]: 4,
				}[topic]);

				const email = message.key.toString();

				await User.findOneAndUpdate(
					{ email: email },
					{ $inc: { availableCredits: -credits, numberOfCharts: 1 } }
				);
			}
		}
	});
};

main();
