var Errand = require("../../models/errand");
var data = require("../data/errands.json");

beforeEach(function(done) {
  Errand.collection.insertMany(data, function(err) {
  });
  done();
});

afterEach(function(done) {
  Errand.remove({}, function(err) {});
  done();
});

describe("Errands Endpoint:",function(){

  it("Returns array of all errands",function(done){
    supertest
      .get("/errands")
      .expect(200)
      .expect("Content-type",/json/)
      .expect(function(res) {
        res.body.should.be.an.instanceOf(Array);
        res.body[0].should.have.property("title","New Errand");
        res.body[0].should.have.property("categories").and.have.lengthOf(6);
      })
      .end(done);
  });

  it("Posts an errend and returns successfully",function(done){
    supertest
      .post("/errands")
      .set("Content-type", "application/json")
      .send({
          "title" : "Help!",
          "description" : "Go to pharmacy, pick up 'script",
          "completedBy" : "29/07/2016",
          "categories" : ["pharmacy","perscription","doctors","urgent"]
      })
      .expect(function(res) {
        res.body.should.be.an.instanceOf(Object);
        res.body.should.have.property("message","Errand Added");
        res.body.data.should.have.property("title","Help!");
        res.body.data.should.have.property("categories").and.have.lengthOf(4);
      })
      .end(done);
  });

});