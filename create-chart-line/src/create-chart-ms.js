// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const printChartData = require("./chart");

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve the HTML form
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', (req, res) => {
	upload.single('file')(req, res, (err) => {
		if (err) {
			console.log(err);
		}

		const file = req.file;

		console.log('Uploaded file:', file);

		printChartData(file.path, (data) => res.send(data)).then(() => {
			fs.unlink(file.path, (err) => {
				if (err) {
					console.log(err);
				}
			});
		});
	});
});

// Start the server
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
