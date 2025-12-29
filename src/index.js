const express = require("express");
const connectDB = require("./db/dbconnection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const allRoutes= require("./routes")
app.use("/",allRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting DB", error);
  });
