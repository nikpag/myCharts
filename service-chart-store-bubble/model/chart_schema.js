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
    png: {
        type: String,
        //contentType: String,
        //required: true
    },
    pdf: {
        type: String,
        //contentType: String,
        //required: true
    },
    svg: {
        type: String,
        //contentType: String,
        //required: true
    },
    json_data: {
        type: Object
    },
    creation_timestamp: {
        type: Date,
        default: Date.now
    },
/*     {
    timestamps: true
}, */
});


//Note: 
const Chart = Mongoose.model("chart_schema", chart_schema)
module.exports = Chart