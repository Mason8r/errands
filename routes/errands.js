var Errand = require("../models/errand");
var express = require("express");
var urlify = require("urlify").create();
var router = express.Router();

router.route("/")

  .get(function(req, res) {
      Errand.find(function(err, errands) {
        if(err) {
          res.json(err);
        }

        res.json(errands);

        });
    })

  .post(function(req, res) {

    var errand = new Errand({
      title: req.body.title,
      slug: req.body.slug ? req.body.slug : urlify(req.body.title),
      description:req.body.description,
      completedBy: new Date(req.body.completedBy),
      categories:req.body.categories
    });

    errand.save(function(err) {

      if (err) {
        res.status(403).json({
          message: err.errmsg, 
          data: err
        });
      }

      res.json({ message: "Errand Added", data: errand });

    });

  });

module.exports = router;