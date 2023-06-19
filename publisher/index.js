// server.js
const { notDeepEqual } = require('assert');
const express = require('express');
const fs = require('fs');
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });
const port = 3001;

const { Kafka } = require("kafkajs");

const broker = "broker:9092";

const kafka = new Kafka({
	clientId: "producer",
	brokers: [broker]
});

const producer = kafka.producer();

async function connect() {
	await producer.connect();
}

connect();


app.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*");
	next();
});

app.post("/uploadAndCreateChart", (req, res) => {
	upload.single("file")(req, res, async (err) => {
		if (err) {
			console.log(err);
		}

		const file = req.file;

		console.log("Uploaded file:", file);

		const csvData = fs.readFileSync(file.path);

		await producer.send({
			topic: "ntua1",
			messages: [{ value: csvData }]
		});

		fs.unlink(file.path, (err) => {
			if (err) {
				console.log(err);
			}
		});
	});

	res.send("OK");
});

app.get("/", (req, res) => {
	console.log("Hello");
});

app.get("/allCharts", (req, res) => {
	const filePath = __dirname + "/image.png";

	fs.readFile(filePath, "base64", (err, fileData) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal server error");
		}

		res.send(
			{
				"data": [
					{
						type: "Line",
						chartName: "Name",
						createdOn: "Monday",
						src: fileData
					},
					{
						type: "Polar area",
						chartName: "OtherName",
						createdOn: "Tuesday",
						src: ""
					}
				]
			}
		);
	});


});

app.get("/image", (req, res) => {
	const filePath = __dirname + "/image.png";

	fs.readFile(filePath, "base64", (err, fileData) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal server error");
		}

		const jsonData = {
			key1: "value1",
			key2: "value2",
			fileData: fileData
		};

		res.json(jsonData);
	});
});

app.get("/chartPreview", (req, res) => {
	const filePath = __dirname + "/image.png";

	fs.readFile(filePath, "base64", (err, fileData) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal server error");
		}

		const jsonData = {
			chartType: "line",
			fileData: fileData
		};

		res.json(jsonData);
	});
});


app.get("/buyCredits/:whatever?", (req, res) => {

	const run = async () => {
		console.log(`broker: ${broker}`);

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

	res.send("OK\n");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

/*

// auto ones;

4 - my charts
chartPreview

*/
