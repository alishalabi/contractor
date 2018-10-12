// Installing body-parser and adding to app
const bodyParser = require("body-parser");
// Installing express, using const app as instantiation
const express = require("express")
const methodOverride = require("method-override")
const Payment = require("./models/payment")
const Student = require("./models/student")
const app = express()


app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({ extended: true }));

// Installing handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Installing mongoose and mongod
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contractor')

const students = require("./controllers/students")(app)



// // Mock array of students (if not connected to DB)
// let students = [
//   { name: "Yves", bio: "Loves to code"},
//   { name: "Zena", bio: "Loves to cook"}
// ]


app.listen(3000, () => {
  console.log("App listening on port 3000!")
})

module.exports = app;
