const mongoose = require("mongoose");
const chartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    png: {
        type: String,
    },
    pdf: {
        type: String,
    },
    svg: {
        type: String,
    },
    json_data: {
        type: String,
    },
});


const Chart = mongoose.model("chart", chartSchema);
module.exports = Chart;
