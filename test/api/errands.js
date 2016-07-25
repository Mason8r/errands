var Errand = require("../../models/errand");
var data = require("../data/errands.json");

beforeEach(function(done) {
  Errand.collection.insertMany(data, function(err) {
    console.log('data loaded.')
  });
  done();
});

afterEach(function(done) {
  Errand.remove({}, function(err) {});
  done();
});

describe("Errands Get endpoint",function(){
  it("Single JSON of Errand",function(done){
    supertest
      .get("/errands")
      .expect(200)
      .expect("Content-type",/json/)
      .expect(function(res) {
        res.body.should.be.an.instanceOf(Array);
        res.body[0].should.have.property('title','New Errand');
        res.body[0].should.have.property('categories').and.have.lengthOf(6);
      })
      .end(done);
  });
});