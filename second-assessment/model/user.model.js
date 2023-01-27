const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    batch: { type: String, required: false },
    enrollment_no: { type: String, required: false },
    role: {
      type: String,
      default: "STUDENT",
      required: false,
      enum: ["STUDENT", "ADMIN", "SUB_ADMIN"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
