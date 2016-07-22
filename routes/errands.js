var Errand = require('../models/errand');
var express = require('express');
var router = express.Router();

router.route('/')

  .get(function(req, res) {
      Errand.find(function(err, errands) {
        if(err) {
          res.json(err);
        }

        res.json(errands);

        });
    })

  .post(function(req, res) {

    //I create the errand in this arse about face
    //way as it's the cleanest looking to create the Date
    var errand = new Errand({
      title: req.body.title,
      description:req.body.description,
      completedBy: new Date(req.body.completedBy),
      categories:req.body.categories
    });

    errand.save(function(err) {

      if (err) {
        res.json(err);
      }

      res.json({ message: 'Errand Added', data: errand });

    });

  });

module.exports = router;