
process.env.NODE_ENV = 'test';

app = require("../app");
supertest = require("supertest")(app);
