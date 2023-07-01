const Mongoose = require("mongoose");
const chart_schema = new Mongoose.Schema({
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


//Note:
const Chart = Mongoose.model("chart_schema", chart_schema);
module.exports = Chart;
