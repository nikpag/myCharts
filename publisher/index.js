// server.js
const { notDeepEqual } = require('assert');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001;

app.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "*");
	next();
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


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

/*

// auto ones;

4 - my charts
chartPreview

*/
