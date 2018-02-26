'use strict';

const User = require('../model/user');
const jwt = require('jsonwebtoken');


exports.createUser = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function (err, user) {
        if (err) {
            return next(err);
        }
        return res.status(200).send('Ok');
    })
};

exports.login = function (req, res, next) {
    var password = req.body.password;
    var query = User.findOne({ email: req.body.email });
    query.exec().then(function (result) {
        if (result !== null) {
            result.comparePassword(password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    var payload = { id: result._id };
                    var token = jwt.sign(payload, process.env.LOGIN_SECRET);
                    return res.json({ token: token });
                } else {
                    return res.status(401).send('Unauthorized');
                }
            });
        } else {
            return res.status(401).send('Unauthorized');
        }
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
            return res.status(404).send('Not found');
        }
        return res.json(user);
    })
};
