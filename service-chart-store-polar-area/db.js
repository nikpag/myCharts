const Mongoose = require("mongoose");
require('dotenv').config()

const localDB = process.env.MONGO_URI;

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;