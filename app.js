// Installing express, using const app as instantiation
const express = require("express")
const methodOverride = require("method-override")
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
  bio: String,
  goal: String,
});

// Installing body-parser and adding to app
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// // Mock array of students (if not connected to DB)
// let students = [
//   { name: "Yves", bio: "Loves to code"},
//   { name: "Zena", bio: "Loves to cook"}
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

// Action: New
app.get("/students/new", (req, res) => {
  res.render("students-new", {});
})

// Action: Create
app.post("/students", (req, res) => {
  Student.create(req.body)
    .then((student) => {
      console.log(student);
      console.log(student._id)
      res.redirect(`/students/${student._id}`)
    }).catch((err) => {
      console.log(err.message);
    })
})

// Action: Show
app.get("/students/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      res.render("students-show", { student: student})
    }).catch((err) => {
      console.log(err.message);
    })
})

// Action: Edit
app.get("/students/:id/edit", (req, res) => {
  Student.findById(req.params.id, function(err, student) {
    res.render("students-edit", { student: student});
  })
})

app.use(methodOverride("_method"))

// Action: Update
app.put("/students/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then(student => {
      res.redirect(`/students/${student._id}`)
    })
    .catch(err =>{
      console.log(err.message)
    })
})

// Action: Delete
app.delete("/students/:id", function (req, res) {
  console.log("DELETE student profile")
  Student.findByIdAndRemove(req.params.id)
    .then((student) => {
      res.redirect("/students");
    }).catch((err) => {
      console.log(err.message);
    })
})

app.listen(3000, () => {
  console.log("App listening on port 3000!")
})
