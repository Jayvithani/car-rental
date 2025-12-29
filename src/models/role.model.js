const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roleSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["USER", "SELLER", "ADMIN"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const roleModel = mongoose.model("Role", roleSchema);
module.exports = roleModel;
