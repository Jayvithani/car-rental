const express = require("express");
const connectDB = require("./db/dbconnection");
require("dotenv").config();
const ROUTES = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/role", ROUTES.ROLE);
app.use("/car", ROUTES.CAR);
app.use("/user", ROUTES.USER);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting DB", error);
  });
