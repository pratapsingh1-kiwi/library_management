const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrower = new Schema(
  {
    email: String,
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "book", required: true },
    purchaseDate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrower", borrower);
