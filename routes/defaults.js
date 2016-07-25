var express = require("express");
var router = express.Router();

router.route("/")

  .get(function(req, res) {
    res.json({message:"API V.0.1"});
  })

  .all(function(req, res) {
    res.json(405,{message:"method not allowed"});
  });

module.exports = router;