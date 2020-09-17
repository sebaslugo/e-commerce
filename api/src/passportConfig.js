const LocalStrategy = require("passport-local").Strategy;
const { User } = require('./db.js');
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("inicializando");
  const authenticateUser = (email, password, done) => {
    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return done(null, false, {
                  message: 'El correo electrónico no existe.',
                });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                  console.log(err);
                }
                if (isMatch) {
                  
                  return done(null, user);
                } else {
                  //password is incorrect
                  return done(null, false, { message: "Password is incorrect" });
                }
            });
            
        })
        .catch(err => {
            if (err) {
              console.log('error en app.js');
              return done(err);
            }
        });
  };

    passport.use(new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
            authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {        
        User.findOne({ where: { id: id}})
            .then(user => {
                if (user) {
                    return done(null, user);
                }
            })
            .catch(err => {
                if (err) {
                  console.log('error en app.js');
                  return done(err);
                }
            })
    });
}

module.exports = initialize;
