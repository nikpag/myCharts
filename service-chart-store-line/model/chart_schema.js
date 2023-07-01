const mongoose = require("mongoose");
const chart_schema = new mongoose.Schema({
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


const Chart = mongoose.model("chart", chart_schema);
module.exports = Chart;
