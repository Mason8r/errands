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

  it("should return a 405 when posting",function(done){
    supertest
      .post("/")
      .set("Content-type", "application/json")
      .send({
        data: "This is h4x0Rz posting"
      })
      .expect(405)
      .end(done);
  });

});