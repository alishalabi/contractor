const Payment = require("../models/payment")

module.exports = (app) => {

  // New Payment
  app.post("/students/payments", (req, res) => {
    // res.send("students payment")
    Payment.create(req.body).then(payment => {
      res.redirect(`/students/${payment.studentId}`);
    }).catch((err) => {
      console.log(err.message)
    })
  })

  app.delete("/students/payments/:id", (req, res) => {
    console.log("DELETE payment")
    Payment.findByIdAndDelete(req.params.id)
      .then((payment) => {
        res.redirect(`/students/${payment.studentId}`)
      }).catch((err) => {
        console.log(err.message)
      })
  })

}
