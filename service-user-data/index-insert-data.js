const mongoose = require("mongoose");

async function main() {
	await mongoose.connect("mongodb://root:example@mongo:27017/Users?authSource=admin");

	const userSchema = new mongoose.Schema({
		email: String,
		numberOfCharts: Number,
		availableCredits: Number,
		lastLogin: Date
	});

	const User = mongoose.model("User", userSchema);

	const user1 = new User({
		email: "user1@gmail.com",
		numberOfCharts: 1,
		availableCredits: 10,
		lastLogin: null,
	});
	const user2 = new User({
		email: "user2@gmail.com",
		numberOfCharts: 2,
		availableCredits: 20,
		lastLogin: null,
	});
	const user3 = new User({
		email: "user3@gmail.com",
		numberOfCharts: 3,
		availableCredits: 30,
		lastLogin: null,
	});

	await user1.save();
	await user2.save();
	await user3.save();

	const users = await User.find();

	console.log(users);
}

main().catch(err => console.log(err));
