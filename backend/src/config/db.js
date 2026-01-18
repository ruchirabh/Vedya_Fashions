const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB CONNECTED SUCCESSFULL 🚀 ");
};
module.exports = connectDB;
