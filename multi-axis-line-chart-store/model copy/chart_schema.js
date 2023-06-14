const Mongoose = require("mongoose")
const chart_schema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    filetype:{
        type: String,
        unique: true,
    },
    file: {
        data: Buffer,
        contentType: String,
        //required: true
    },
    creation_timestamp: {
        type: Date,
        default: Date.now
    },
/*     {
    timestamps: true
}, */
});

const Chart = Mongoose.model("chart_schema", chart_schema)
module.exports = Chart