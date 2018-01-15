'use strict';

var Profile = require('../model/profile');
var queryHelper = require('../../../utils/queryHelpers');

exports.getProfile = function (req, res, next) {
    Profile.findOne(null, function (err, profile) {
        if (err) {
            return next(err);
        }
        if (!profile) {
            return res.status(404);
        }
        return res.json(profile);
    });
};

exports.updateProfile = function (req, res, next) {
    var id = req.params.profileId;
    Profile.findByIdAndUpdate(id, { $set: req.body }, function (err, profile) {
        if (err) {
            return next(err);
        }
        if (!profile) {
            return res.status(404)
        }
        return res.json(profile);
    })
};