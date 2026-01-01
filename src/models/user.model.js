const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: ObjectId,
    ref: "roles",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
