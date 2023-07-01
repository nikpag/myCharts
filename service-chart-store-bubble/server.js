const connectDB = require("./db");
const Chart = require("./model/chart_schema");
const mongoose = require('mongoose');

// TODO Might need to await this
connectDB();


const { Kafka } = require("kafkajs");


// TODO Remove express-related dependencies
// TODO This might prove useful, removing it for now to make sure it doesn't interfere with anything else
// process.on("unhandledRejection", (err) => {
//   console.log(`An error occurred: ${err.message}`);
//   server.close(() => process.exit(1));
// });

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

const main = async () => {
    await producer.connect();

    await consumer.subscribe({
        topics: [
            process.env.KAFKA_TOPIC_CHART_SAVE_REQUEST,
            process.env.KAFKA_TOPIC_GET_CHART_REQUEST,
            process.env.KAFKA_TOPIC_CHARTLIST_GET_REQUEST,
            process.env.KAFKA_TOPIC_CHART_DOWNLOAD_REQUEST,
        ],
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, message, }) => {
            if (topic === process.env.KAFKA_TOPIC_CHART_SAVE_REQUEST) {
                const user = message.key.toString();
                const value = JSON.parse(message.value.toString());
                const png_data = value.png;
                const pdf_data = value.pdf;
                const svg_data = value.svg;
                const json_data = value.json;

                try {
                    const newChart = new Chart({
                        username: user,
                        png: png_data,
                        pdf: pdf_data,
                        svg: svg_data,
                        json_data: json_data,
                    });
                    await newChart.save();
                    console.log('File saved in MongoDB with ID:', newChart._id);
                    //res.status(200).json({message: 'File uploaded and saved successfully.'});
                }
                catch (error) {
                    console.error('Failed to save file:', error);
                    //res.status(500).send('Failed to save file.');
                }
            }
            else if (topic === process.env.KAFKA_TOPIC_CHART_DOWNLOAD_REQUEST) {
                const id = message.key.toString();
                const fileType = message.value.toString();

                console.log("Received message on this topic!");

                const chart = await Chart.findOne({ _id: id });

                console.log("CHARTBYID IS", chart._id, chart.json_data);

                const response = { data: chart[fileType], fileType: fileType };

                await producer.send({
                    topic: process.env.KAFKA_TOPIC_CHART_DOWNLOAD_RESPONSE,
                    messages: [
                        { key: id, value: JSON.stringify(response) }
                    ]
                });
            }
            else if (topic === process.env.KAFKA_TOPIC_CHARTLIST_GET_REQUEST) {
                console.log(`Message arrived to topic ${process.env.KAFKA_TOPIC_CHARTLIST_GET_REQUEST}`);

                const email = message.value.toString();

                const charts = await Chart.find({ username: email });

                const chartsJsonData = charts.map(chart => {
                    return JSON.stringify({ id: chart._id.toString(), ...JSON.parse(chart.json_data) });
                });

                console.log("CHARTJSONDATAIS", JSON.stringify(chartsJsonData));

                await producer.send({
                    topic: process.env.KAFKA_TOPIC_CHARTLIST_GET_RESPONSE,
                    messages: [
                        { key: email, value: JSON.stringify(chartsJsonData) }
                    ]
                });
            }
        }
    });
};

main();
