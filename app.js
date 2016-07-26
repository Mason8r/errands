var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require('morgan');
var dotenv = require('dotenv');

let secured = require("./middleware/secured");

var defaults = require("./routes/defaults");
var auth = require("./routes/auth");
var users = require("./routes/users");
var errands = require("./routes/errands");

dotenv.load();

var dbName = process.env.NODE_ENV == "test" ?  "errandTestDB" : "errandDB";
var connectionString = "mongodb://localhost/" + dbName;
mongoose.connect(connectionString);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(logger('dev'));
app.use("/", defaults);
app.use("/auth", auth);
app.use("/users", users);
app.use("/errands", errands);

app.get('/api', secured, function(req, res) {
  res.json({ message: 'secured via FUCKING GAYS or something' });
});

module.exports = app;

