let User = require("../models/user");
let express = require("express");
let router = express.Router();
let bcrypt = require('bcryptjs');

router.route("/")
  .get(function(req, res) {
    res.json({message:"list of users"});
  });

router.route("/quickstart")

  .get(function(req, res) {


    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("password", salt, function(err, hash) {
          let stu = new User({
            username: "admin",
            email: "stu@stuartmason.co.uk",
            password: hash
          });

          stu.save(saveResponse(err,stu));
        });
    });

    function saveResponse(error, stu) {
      if(error) {
        return res.status(403).json({
          message: err, 
          data: err
        });
      }
      res.json({ message: "Stu Added!", data: stu });
    }

  });

module.exports = router;