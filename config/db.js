const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {

  try {
    mongoose.connect(db, {
      useNewUrlParser: true,

    });
  } catch (error) {
    console.error(error, "MongoDB connection error occured");
    process.exit(1);
  }

  console.log("MongoDB connected");

}

module.exports = connectDB;