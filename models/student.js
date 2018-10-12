const mongoose = require("mongoose");
const Payment = require("./models/payment")

// Creating our Student model
const Student = mongoose.model("Student", {
  name: String,
  bio: String,
  goal: String,
});

module.exports = Student;
