const connectDB = require("./db");
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const chart_name = process.env.CHART_NAME;
const Chart = require("./model/chart_schema");
const mongoose = require('mongoose');

connectDB();

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//Link when server is running is localhost:PORT/api/line_chart/{api_call}, where api call is either ulpoad or get_charts

// This was used for api
//app.use('/api/' + chart_name, routes);


//app.use("/upload", require("./routes/routes"));
//app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))

const { Kafka } = require("kafkajs");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });


//Do I need a main for this to work?
const main = async () => {
	await producer.connect();

	await consumer.subscribe({
		topics : [
      process.env.KAFKA_TOPIC_CHART_SAVE_REQUEST, 
      process.env.KAFKA_TOPIC_GET_CHART_REQUEST
    ],
		fromBeginning: true
	});

  await consumer.run ({
    eachMessage: async ({ topic, message,}) => {
      if (topic == KAFKA_TOPIC_CHART_SAVE_REQUEST) {
        const user = message.key.toString();
        const value = JSON.parse(message.value.toString());
        const png_data = value.png;
        const pdf_data = value.pdf;
        const svg_data = value.svg;
        const json_data = value.json;
        const filename = value.filename;
        const creation_timestamp = value.creation_timestamp;

        try {
          const newChart = new Chart({ 
              username : user,
              filename : filename,
              png : png_data,
              pdf : pdf_data,
              svg : svg_data,
              json_data : json_data,
              creation_timestamp : creation_timestamp,  
          });
          await newChart.save();
          console.log('File saved in MongoDB with ID:', newChart._id);
          //res.status(200).json({message: 'File uploaded and saved successfully.'});
        } 
        catch (error) {
          console.error('Failed to save file:', error);
          //res.status(500).send('Failed to save file.');
      }}
      else if(topic == KAFKA_TOPIC_GET_CHART_REQUEST) {
        const user = message.key.toString();
        try {
          const all_charts = await Chart.find({ username : username });
          await producer.send({
            topic: process.env.KAFKA_TOPIC_GET_CHART_RESPONSE,
            messages: [
              { key: user, value: JSON.stringify(pictures) }
            ]
          });
          //res.status(200).json(all_charts);
        } catch (error) {
          console.error('Failed to retrieve images:', error);
          //res.status(500).send('Failed to retrieve images.');
        } 

      }
    }
  });
};

main();