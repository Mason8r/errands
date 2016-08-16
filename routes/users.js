let User = require("../models/user");
let express = require("express");
let router = express.Router();
let bcrypt = require('bcryptjs');
//let validator = require('../middleware/validation/user');

//router.use(validator);

router.route("/")
  .get(function(req, res) {
    res.json({message:"list of users"});
  })
  .post(function(req, res) {

    req.check(req.body.username, 'username' ).isUsernameAvailable();

    req.asyncValidationErrors()
    .then(function() {
    	let rawUser = req.body;
      bcrypt.genSalt(10, createHashFromBodyPassword(rawUser.password));
    })
    .catch(function(errors) {
      res.send(errors);
    });

    function createHashFromBodyPassword(rawPassword) {
      return function(err, salt) {
        bcrypt.hash(rawPassword, salt, createNewUserWithHash);
      }
    };

    function createNewUserWithHash(err, hash) {
      let user = new User({
        username: rawUser.username,
        email: rawUser.email,
        password: hash
      });
      user.save(saveUserResponse(err,user));
    };

    function saveUserResponse(err, user) {
      if(err) {
        res.status(403).json({
          message: err, 
          data: err
        });
      }
      res.json({ message: "Success - User Added!", data: user });
    };

  });

router.route("/quickstart")

  .get(function(req, res) {


    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("password", salt, function(err, hash) {
          let user = new User({
            username: "admin",
            email: "stu@stuartmason.co.uk",
            password: hash
          });

          user.save(saveResponse(err,user));
        });
    });

    function saveResponse(error, user) {
      if(error) {
        return res.status(403).json({
          message: err, 
          data: err
        });
      }
      res.json({ message: "Success - User Added!", data: user });
    }

  });



module.exports = router;