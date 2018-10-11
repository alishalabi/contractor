const mongoose = require("mongoose");

// Creating our Student model
const Student = mongoose.model("Student", {
  name: String,
  bio: String,
  goal: String,
});

module.exports = Student;
