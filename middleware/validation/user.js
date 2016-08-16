let expressValidator = require('express-validator');
let User = require("../../models/user");

let userValidation = expressValidator({
  customValidators: {
    isUsernameAvailable: function(username) {
      return new Promise(function(resolve, reject) {
        User.findOne({ username: username })
        .then(function(user) {
          if (user) {
            resolve(user);
          } else {
            reject(user);
          }
        })
        .catch(function(error){
          if (error) {
            reject(error);
          }
        })
      });
    }
  }
});

module.exports = userValidation;