const express = require('express');
const router = express.Router();
const FileController = require('../controller/store');
const FileController_get = require('../controller/get_charts');
const multer = require('multer');

const upload = multer();
//const bodyParser = require("body-parser");

//router.use(bodyParser.json());
// Define the file upload route
router.post('/upload', upload.single('file'), FileController.uploadFile);
router.get('/', (req, res) => {
    res.send('Hello World!')
  });

//The link for the following get method is in the form "http://localhost:{PORT}/api/{chart_name}/get_charts/{username_you_are_looking_for}"
router.get('/get_charts/:username', FileController_get.get_charts);

module.exports = router;