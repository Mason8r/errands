let jwt = require('jsonwebtoken');

let hasRole = function(role) {
  return function(req, res, next) {
    let decodedTokenObject = jwt.decode(req.headers.authorization);
    if (decodedTokenObject && decodedTokenObject[role]) {
      next();
    } else {
      return res.status(401).send({  
          message: `The request lacks ${role} credentials for the target resource.`
      });
    };
  };
};

module.exports = hasRole;