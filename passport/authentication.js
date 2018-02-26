'use strict';

const User = require('../api/user/model/user');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

var jwtOptions = {
    secretOrKey: process.env.LOGIN_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function (passport) {
    passport.use(new Strategy(jwtOptions, function (jwt_payload, next) {
        User.findById(jwt_payload.id).exec()
            .then(function (result) {
                if (result) {
                    return next(null, result);
                } else {
                    return next(null, false);
                }
            }).catch(function (err) {
                return next(null, false);
            });
    }));

    passport.serializeUser(function (user, next) {
        return next(null, user._id);
    });

    passport.deserializeUser(function (id, next) {
        User.findById(id).exec()
            .then(function (result) {
                if (result) {
                    return next(null, result);
                } else {
                    return next(null, false);
                }
            }).catch(function (err) {
                return next(null, false);
            });
    });
}