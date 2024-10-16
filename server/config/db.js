//connect to the data base
const mongoose = require("mongoose");

const connectDB = async (username, password, database) => {
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.e2aee.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected");
  } catch {
    console.error("Database connection failed");
  }
};
module.exports = connectDB;