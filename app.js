// Because we willm want to execute HTTP requests,
// we are going to install express into our program
// and create an instance called "app"
const express = require("express")
const app = express()
// We are going to be redneering HTML templates, so
// we will install handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Let us create a mock array of students
let students = [
  { name: "Adam", bio: "Loves to code"},
  { name: "Billy", bio: "Loves to cook"}
]

//Express methods
app.get('/', (req, res) => {
  res.render("home", { msg: "Handlebars are Cool!" });
})

// Action: Index
app.get("/students", (req, res) => {
  res.render("students-index", { students: students});
})

app.listen(3000, () => {
  console.log("App listening on port 3000!")
})
