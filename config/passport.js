//load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

//load up the user model
var User          = require('../app/models/user');

//expose this function to our app using module.exports
module.exports = function(passport) {

  //serializing user
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  //deserializing user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //create new passport strategy
  passport.use('local-signin-up', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, username, password, done) {

    User.findOne({ 'local.username' :  username }, function(err, user) {
      //if there are any errors, return the error
      if (err)
        return done(err);

      //check to see if theres already a user with that username
      if (user) {
        //if there is check his pass
        if (user.validPassword(password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {

        //if there is no user with that username then create one
        var newUser            = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);

        //save the user
        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });

  }));
};
