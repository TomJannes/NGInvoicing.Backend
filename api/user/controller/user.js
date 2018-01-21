'use strict';

const User = require('../model/user');
const passportStrategy = require('./../../../passport/strategy');

exports.createUser = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function (err, user) {
        if (err) {
            return next(err);
        }
        return res.json(newUser);
    })
};

exports.login = function (req, res, next) {
    var password = req.body.password;
    var query = User.findOne({ email: req.body.email });
    query.exec().then(function (result) {
        result.comparePassword(password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                var payload = { id: result._id };
                var token = jwt.sign(payload, passportStrategy.secretOrKey);
                return res.json({ token: token });
            } else {
                return res.status(401);
            }
        });
    }).catch(function (err) {
        return next(err);
    });
}

exports.updateUser = function (req, res, next) {
    var id = req.params.userId;
    User.findByIdAndUpdate(id, { $set: req.body }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404)
        }
        return res.json(user);
    })
};