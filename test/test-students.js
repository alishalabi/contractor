const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const Student = require("../models/student")

const sampleStudent = {
  "name": "Albert",
  "bio": "Loves to code",
  "goal": "10000"
}

chai.use(chaiHttp);

describe("Students", () => {

  after(() => {
    Student.deleteMany({name: "Albert"})
      .exec((err, students) => {
        console.log(students)
        students.remove();
      })
  });

  //Test Index
  it("should index ALL students on /students GET", (done) => {
    chai.request(server)
      .get("/students")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });


  // Test New
  it("should display new form on /students/new GET", (done) => {
    chai.request(server)
      .get(`students/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
      });


  // Test Create
  it("should create a SINGLE student on /students POST", (done) => {
    chai.request(server)
      .post('/students')
      .send(sampleStudent)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      })
  })

  // Test Show
  it("should show a SINGLE student on /students/<id> GET", (done) => {
    var student = new Student(sampleStudent);
    student.save((err, data) => {
      chai.request(server)
        .get(`students/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done()
        })
    })
  })


  // Test Edit
  it("should edit a SINGLE student on /students/<id> GET", (done) => {
    var student = new Student(sampleStudent);
    student.save((err, data) => {
      chai.request(server)
        .get(`students/${data._id}/edit`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done()
        })
    })
  })
  // Test Update
  it("should update a SINGLE student on /students/<id> PUT", (done) => {
    var student = new Student(sampleStudent):
    review.save((err, data) => {
      chai.request(server)
        .put(`/students/${data._id}?_method=PUT`)
        .send({"name" : "Updating the name"})
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  })
  // Test Delete
  it("should delete a SINGLE student on /students/<id> DELETE", (done) => {
    var student = new Student(sampleStudent);
    review.save((err, data) => {
      chai.request(server)
        .delete(`/students/${data._id}?_method=DELETE`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done()
        })
    })
  })

});
