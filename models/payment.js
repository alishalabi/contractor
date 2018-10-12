const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Payment = mongoose.model("Payment", {
  name: String,
  amount: Number,
  reviewId: { type: Schema.Types.ObjectId, ref: "Student"}
})

module.exports = Payment;
