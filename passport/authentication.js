'use strict';

const passport = require("passport");  
const passportJWT = require("passport-jwt");  
// var users = require("./users.js");  
// var cfg = require("./config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var config = require('./config');

var jwtOptions = {  
    secretOrKey: config.secretOrKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function (passport) {
    passport.use(new Strategy(jwtOptions, function (jwt_payload, next) {
        console.log('payload received', jwt_payload);
        // usually this would be a database call:
        //var user = users[_.findIndex(users, { id: jwt_payload.id })];
        var user = { id: jwt_payload.id, name: 'Tom' };
        if (user) {
            return next(null, user);
        } else {
            return next(null, false);
        }
    }));

    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        return cb(null, {name: 'piep'});
        // db.users.findById(id, function (err, user) {
        //     if (err) { return cb(err); }
        //     cb(null, user);
        // });
    });
}

// 'use strict';

// var passport = require("passport");  
// var passportJWT = require("passport-jwt");  
// // var users = require("./users.js");  
// var cfg = require("./config.js");  
// var ExtractJwt = passportJWT.ExtractJwt;  
// var Strategy = passportJWT.Strategy;  
// var params = {  
//     secretOrKey: cfg.secretOrKey,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// };

// module.exports = function() {  
//     var strategy = new Strategy(params, function(payload, done) {
//         return done({ name: 'teesst' });
//         // var user = users[payload.id] || null;
//         // if (user) {
//         //     return done(null, {
//         //         id: user.id
//         //     });
//         // } else {
//         //     return done(new Error("User not found"), null);
//         // }
//     });
//     passport.use(strategy);
//     return {
//         initialize: function() {
//             return passport.initialize();
//         },
//         authenticate: function() {
//             return passport.authenticate("jwt", cfg.jwtSession);
//         }
//     };
// };

// 'use strict';

// const passport = require('passport');
// const passportJWT = require("passport-jwt");

// const jwt = require('jsonwebtoken');
// // const ExtractJwt = passportJWT.ExtractJwt;
// const Strategy = passportJWT.Strategy;
// //const StrategyOptions = require('./strategyOptions');

// module.exports = function (jwtOptions) {
//     passport.use(new Strategy(jwtOptions, function (jwt_payload, next) {
//         console.log('payload received', jwt_payload);
//         // usually this would be a database call:
//         //var user = users[_.findIndex(users, { id: jwt_payload.id })];
//         var user = { id: jwt_payload.id, name: 'Tom' };
//         if (user) {
//             next(null, user);
//         } else {
//             next(null, false);
//         }
//     }));

//     passport.serializeUser(function (user, cb) {
//         cb(null, user.id);
//     });

//     passport.deserializeUser(function (id, cb) {
//         var user = { id: 1, username: username, password: password };
//         cb(null, user);
//     });

//     app.use(passport.initialize());
// };



// // app.post('/login', login);

// // app.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
// //     return res.json('{ "piep": "woop"}')
// // })

// // app.listen(port);

// // function login(req, res) {
// //     var user = { id: 1, username: req.body.username, password: 'test' };
// //     if (user.password === req.body.password) {
// //         var payload = { id: user.id };
// //         var token = jwt.sign(payload, jwtOptions.secretOrKey);
// //         res.json({ message: "ok", token: token });
// //     } else {
// //         res.status(401).json({ message: "passwords did not match" });
// //     }
// // }