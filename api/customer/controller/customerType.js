'use strict';

var CustomerType = require('../model/customerType');

exports.findCustomerTypes = function (req, res, next) {
    CustomerType.find().exec(function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
};