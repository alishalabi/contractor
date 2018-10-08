// Installing express, using const app as instantiation
const express = require("express")
const app = express()

// Installing handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Installing mongoose and mongod
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contractor')

const Student = mongoose.model("Student", {
  name: String,
  bio: String
});

// // Mock array of students (if not connected to DB)
// let students = [
//   { name: "Adam", bio: "Loves to code"},
//   { name: "Billy", bio: "Loves to cook"}
// ]

//Express methods
app.get('/', (req, res) => {
  res.render("home", { msg: "Welcome to Scholarship Flight!" });
})

// Action: Index
app.get("/students", (req, res) => {
  Student.find()
    .then(students => {
        res.render("students-index", { students: students});
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log("App listening on port 3000!")
})
