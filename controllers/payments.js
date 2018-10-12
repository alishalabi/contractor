module.exports = (app) => {

  // New Payment
  app.post("/students/payments", (req, res) => {
    // res.send("students payment")
    Payment.create(req.body)
      .then(payment => new Promise(function(resolve, reject) {
        res.redirect(`/students/${payment.studentId}`);
      }).catch((err) => {
        console.log(err.message)
      })
    })

}
