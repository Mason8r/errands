let jwt = require('jsonwebtoken');
let secured = function(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
};
module.exports = secured;
