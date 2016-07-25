var express = require('express');
var router = express.Router();

router.route('/')

  .get(function(req, res) {
    res.json({data:'API V.0.2'});
  })

  .all(function(req, res) {
    res.send(405,"method not allowed");
  });

module.exports = router;