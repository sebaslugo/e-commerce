const { User } = require('./db.js');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const configAuth = require('./configAuth');
const bcrypt = require('bcrypt');

var jwtOptions = {};

exports.use = () => {

    // used to serialize the user for the session
    passport.serializeUser((user, done) => done(null, user.id));

    // used to deserialize the user
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

    /* ***************************************** */
    /* JWT STRATEGY */
    /* ***************************************** */

    let ExtractJwt = passportJWT.ExtractJwt;
    let JwtStrategy = passportJWT.Strategy;
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'secreto';

    let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
        console.log('payload: ', jwt_payload);
        var expirationDate = new Date(jwt_payload.exp * 1000)
        if(expirationDate < new Date()) {
            return done(null, false);
        }
        User.findOne({
            where: {
                id: jwt_payload.id
            }
        }).then(user => {
            next(null, user);
        }).catch(err => {
            next(null, false);
        });
    });
    passport.use(strategy);

    /* ***************************************** */
    /* GOOGLE STRATEGY */
    /* ***************************************** */
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true,
        proxy: true
        },
        function(req, token, refreshToken, profile, done) {
            process.nextTick(async function() {
                console.log(profile);
                const user = profile._json;
                const password = 'hola1234';
                let hashedPassword = await bcrypt.hash(password, 10);                  
                User.findOrCreate({
                    where: { email: user.email },
                    defaults: {
                        name: user.given_name,
                        lastName: user.family_name,
                        email: user.email,
                        password: hashedPassword,
                        otherAuth: 'yes'
                    }
                })
                .then(res => res[0])
                .then(user => {
                    done(null, user);
                })
                .catch(err => done(err));
            });
        }            
    ));

    /* ***************************************** */
    /* GITHUB STRATEGY */
    /* ***************************************** */
    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL,
        passReqToCallback: true,
        scope: ['user:email', 'read:user']
        },
        function(accessToken, refreshToken, params, profile, cb) {
            process.nextTick(async function() {              
                console.log(params);
                const user = profile;
                const password = 'hola1234';
                let hashedPassword = await bcrypt.hash(password, 10);                  
                User.findOrCreate({
                    where: { email: user.emails[0].value },
                    defaults: {
                        name: user.displayName || user.username,
                        lastName: user.username,
                        email: user.emails[0].value,
                        password: hashedPassword,
                        otherAuth: 'yes'
                    }
                })
                .then(res => res[0])
                .then(user => {
                    cb(null, user);
                })
                .catch(err => cb(err));            
            });
        }
    ));
}

exports.passport = passport;
exports.jwtOptions = jwtOptions;
exports.jwt = jwt;