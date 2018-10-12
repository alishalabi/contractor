const Student = require("../models/student")

module.exports = function (app) {

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
        res.redirect(`/students/${student._id}`);
      }).catch((err) => {
        console.log(err.message);
      })
  })

  // Action: Show
  app.get("/students/:id", (req, res) => {
    Student.findById(req.params.id)
      .then((student) => {
        Comment.find({ studentId: req.params.id })
          .then(payments => {
            res.render("students-show", { student: student, payments: payments })
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

}
