var User = require('./userModel');
var bcrypt = require('bcrypt');

module.exports = {
  signIn: function (req, next) {
    User.findOne({username: req.body.username})
      .exec(function (err, user) {
        if(user){
          // bcrypt.compare(req.body.password, user.password, function(err, res) {
          if(user.password === req.body.password){
            next(err, user);
          }
          // });
        }else{
          next("Not Found");
        }
      });
  },

  signUp: function (req, next) {
    User.create(req.body, function (err) {
      if(err){
        next(null, "Duplicate");
      }else{
        next(null, "Added");
      }
    });
  }
};
