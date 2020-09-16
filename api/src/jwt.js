const { User } = require('./db.js');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

var jwtOptions = {};

exports.use = () => {

    let ExtractJwt = passportJWT.ExtractJwt;
    let JwtStrategy = passportJWT.Strategy;
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'secreto';

    let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
        console.log('payload: ', jwt_payload);
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
}

exports.passport = passport;
exports.jwtOptions = jwtOptions;
exports.jwt = jwt;