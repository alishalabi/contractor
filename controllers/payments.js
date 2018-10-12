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

  app.delete("/students/payments/:id". function(req, res) => {
    console.log("DELETE payment")
    Payment.findByIdAndRemove(req.params.id)
      .then((payment) => {
        res.redirect(`/students/${payment.reviewId}`)
      }).catch((err) => {
        console.log(err.message)
      })
  })

}
