const mongoose = require("mongoose");
const express = require("express");

const app = express();

async function main() {
	await mongoose.connect("mongodb://root:example@mongo:27017/Users?authSource=admin");

	const userSchema = new mongoose.Schema({
		email: String,
		numberOfCharts: Number,
		availableCredits: Number,
		lastLogin: Date
	});

	const User = mongoose.model("User", userSchema);

	app.get("/getUser/:email", async (req, res) => {
		const email = req.params.email;

		let user = await User.findOne({ email: email });

		if (user === null) {
			user = {};
		}

		res.set("Access-Control-Allow-Origin", "*");

		res.send(user);
	});

	app.get("/insertUser/:email", async (req, res) => {

		const user = new User({
			email: req.params.email,
			numberOfCharts: 0,
			availableCredits: 0,
			lastLogin: null,
		});

		await user.save();

		res.set("Access-Control-Allow-Origin", "*");

		res.send(user);

	});

	app.get("/deleteUser/:email", async (req, res) => {
		await User.deleteOne({ email: req.params.email });

		res.set("Access-Control-Allow-Origin", "*");

		res.send("{}");
	});
}

const port = 3001;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

main().catch(err => console.log(err));
