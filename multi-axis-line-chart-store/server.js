const express = require("express");
const connectDB = require("./db");
const routes = require('./routes/routes');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const chart_name = process.env.CHART_NAME;

connectDB();

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Link when server is running is localhost:PORT/api/line_chart/{api_call}, where api call is either ulpoad or get_charts
app.use('/api/'+chart_name, routes)
//app.use("/upload", require("./routes/routes"));
//app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
