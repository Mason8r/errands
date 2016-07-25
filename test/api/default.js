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