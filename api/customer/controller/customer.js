'use strict';

var Customer = require('../model/customer');
var queryHelper = require('../../../utils/queryHelpers');

exports.findCustomers = function (req, res, next) {
    var searchParams = {};
    if (req.query.name) searchParams.name = { $regex: new RegExp(`^${req.query.name}`, 'i') };
    if (req.query.kbo) searchParams.kbo = { $regex: new RegExp(`^${req.query.kbo}`, 'i') };

    return queryHelper.find(req, res, next, Customer, searchParams);
};

exports.createCustomer = function (req, res, next) {
    var newCustomer = new Customer(req.body);
    newCustomer.save(function (err, customer) {
        if (err) {
            return next(err);
        }
        return res.json(newCustomer);
    })
};

exports.getCustomer = function (req, res, next) {
    var id = req.params.customerId;
    Customer.findById(id, function (err, customer) {
        if (err) {
            return next(err);
        }
        if (!customer) {
            return res.status(404);
        }
        return res.json(customer);
    });
};

exports.updateCustomer = function (req, res, next) {
    var id = req.params.customerId;
    Customer.findByIdAndUpdate(id, { $set: req.body }, function (err, customer) {
        if (err) {
            return next(err);
        }
        if (!customer) {
            return res.status(404)
        }
        return res.json(customer);
    })
};

exports.deleteCustomer = function (req, res, next) {
    var id = req.params.customerId;
    Customer.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return next(err);
        }
        if (!customer) {
            return res.status(404)
        }
        return res.json(result);
    })
};