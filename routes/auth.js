let User = require("../models/user");
let express = require("express");
let router = express.Router();
let bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.route("/")
  .get(function(req, res) {
    res.json({message:"use /login to login."});
  });

router.route("/login")
  .post(function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      
      if (err) throw err;

      if(!user) {
        return res.json({message: "Username not found"})
      }

      bcrypt.compare(req.body.password, user.password, function(err, success) {
          
          if(!success) {
            return res.json({message: "Username not found"})
          }

          let token = jwt.sign({
              admin : user.admin,
              username : user.username,
              email : user.email
            }, process.env.SECRET);

          res.json({message:"login successful", token: token});
      });
    });
  });

module.exports = router;