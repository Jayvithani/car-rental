const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("DATABASE_URL", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Database Connected successfully...");
  } catch (error) {
    console.log("❌ Database Connections Error :", error);
  }
};

module.exports = connectDB;