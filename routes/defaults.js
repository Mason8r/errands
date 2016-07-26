var express = require("express");
var router = express.Router();

router.route("/")

  .get(function(req, res) {
    res.json({message:"API V.0.1"});
  })

  .all(function(req, res) {
    res.status(405).json({message:"method not allowed"});
  });

module.exports = router;