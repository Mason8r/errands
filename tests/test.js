var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:8000");

beforeEach(function() {
  
})

describe("SAMPLE unit test",function(){

  it("should return home page",function(done){
    server
    .get("/")
    .expect(200)
    .expect("Content-type",/json/)
    .end(function(err, res) {

      
    }, done());
  });

});