var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require('morgan');
var dotenv = require('dotenv');
var expressValidator = require('express-validator');

var defaults = require("./routes/defaults");
var auth = require("./routes/auth");
var users = require("./routes/users");
var errands = require("./routes/errands");
var siteAdmin = require("./routes/admin");

dotenv.load();

var dbName = process.env.NODE_ENV == "test" ?  "errandTestDB" : "errandDB";
var connectionString = "mongodb://localhost/" + dbName;
mongoose.connect(connectionString);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());

app.use(expressValidator({
  customValidators: {
    isUsernameAvailable: function(username) {
      console.log(username)
      return new Promise(function(resolve, reject) {
        User.findOne({ username: username })
        .then(function(user) {
          if (user) {
            resolve(user);
          } else {
            reject(user);
          }
        })
        .catch(function(error){
          if (error) {
            reject(error);
          }
        })
      });
    }
  }
}))

app.use(logger('dev'));
app.use("/", defaults);
app.use("/auth", auth);
app.use("/admin", siteAdmin);
app.use("/users", users);
app.use("/errands", errands);

module.exports = app;

