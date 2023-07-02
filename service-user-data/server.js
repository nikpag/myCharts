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

	// How we describe users
	const userSchema = new mongoose.Schema({
		email: String,
		numberOfCharts: Number,
		availableCredits: Number,
		lastLogin: Date
	});

	const User = mongoose.model("User", userSchema);

	await producer.connect();

	await consumer.connect();

	// Subscribe to:
	// - Credits update requests
	// - Last login update requests
	// - User create requests
	// - User get requests
	// - Chart save requests (here, this serves as a "Charge the user!" request)
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
			// If update...
			if (topic === process.env.KAFKA_TOPIC_CREDITS_UPDATE_REQUEST) {
				const email = message.key.toString();
				const credits = Number(message.value.toString());

				// then update...
				await User.findOneAndUpdate(
					{ email: email },
					{ $inc: { availableCredits: credits } }
				);
			}
			// Else if update...
			else if (topic === process.env.KAFKA_TOPIC_LAST_LOGIN_UPDATE_REQUEST) {
				const email = message.value.toString();

				// update still...
				await User.findOneAndUpdate(
					{ email: email },
					{ lastLogin: new Date() }
				);
			}
			// But if get...
			else if (topic === process.env.KAFKA_TOPIC_USER_GET_REQUEST) {
				const email = message.value.toString();

				// get!
				const user = await User.findOne({ email: email });

				producer.send({
					topic: process.env.KAFKA_TOPIC_USER_GET_RESPONSE,
					messages: [
						{ key: email, value: JSON.stringify(user) }
					]
				});
			}
			// And if create...
			else if (topic === process.env.KAFKA_TOPIC_USER_CREATE_REQUEST) {
				const email = message.value.toString();

				// Create!!!
				const newUser = new User({
					email: email,
					numberOfCharts: 0,
					availableCredits: 0,
					lastLogin: new Date()
				});

				await newUser.save();
			}
			// This one is like the IRS
			else if (topic === process.env.KAFKA_TOPIC_CHART_SAVE_LINE_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_MULTI_AXIS_LINE_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_RADAR_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_SCATTER_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_BUBBLE_REQUEST
				|| topic === process.env.KAFKA_TOPIC_CHART_SAVE_POLAR_AREA_REQUEST) {

				// Not all charts are created equal...
				// Map the chart type to the corresponding credits
				const credits = Number({
					[process.env.KAFKA_TOPIC_CHART_SAVE_LINE_REQUEST]: 1,
					[process.env.KAFKA_TOPIC_CHART_SAVE_MULTI_AXIS_LINE_REQUEST]: 2,
					[process.env.KAFKA_TOPIC_CHART_SAVE_RADAR_REQUEST]: 4,
					[process.env.KAFKA_TOPIC_CHART_SAVE_SCATTER_REQUEST]: 2,
					[process.env.KAFKA_TOPIC_CHART_SAVE_BUBBLE_REQUEST]: 3,
					[process.env.KAFKA_TOPIC_CHART_SAVE_POLAR_AREA_REQUEST]: 4,
				}[topic]);

				const email = message.key.toString();

				// If a chart is created, don't let them get away with it! Charge them!
				await User.findOneAndUpdate(
					{ email: email },
					{ $inc: { availableCredits: -credits, numberOfCharts: 1 } }
				);
			}
		}
	});
};

main();
