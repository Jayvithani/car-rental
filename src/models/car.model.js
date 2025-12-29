const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;
const carSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brandName: {
    type: ObjectId,
    required: true,
    ref: "brands",
  },
  carType: {
    type: String,
    enum: ["SUV", "Sedan"],
  },
  manufacturingYear: {
    type: Number,
  },
  features: {
    type: [String],
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
  },
  capicity: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: "users",
  },
  serviceType: {
    type: String,
    enum: ["RENTAL", "SELL"],
  },
  rentPerHour: {
    type: Number,
  },
});

const carModel = mongoose.model("cars", carSchema);
module.exports = carModel;
