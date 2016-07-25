process.env.NODE_ENV = 'test';

var app = require("../app");
var supertest = require("supertest")(app);
var should = require("should");
var Errand = require("../models/errand");

beforeEach(function(done) {
  var testErrand = new Errand({
      title: 'New Errand',
      description: 'This is a new errend, perhaps it should be loaded from a json test data file?',
      completedBy: new Date(),
      categories: ['this','is','an','array','of','categories']
  });
  testErrand.save();
  done();
});

afterEach(function(done) {
  Errand.remove();
  done();
});

describe("Root endpoint",function(){
  it("should return JSON of API version",function(done){
    supertest
      .get("/")
      .expect(200)
      .expect("Content-type",/json/)
      .expect(function(res) {
        res.body.should.match(/API V.*/);
      })
      .end(done);
  });
});