let express = require("express");
let router = express.Router();

let secured = require("../middleware/secured");
let hasRole = require("../middleware/hasRole");

router.use(secured);
router.use(hasRole('admin'));

router.route("/")
  .get(function(req, res) {
    res.json({message:"administration of users and site settings"});
  });

module.exports = router;