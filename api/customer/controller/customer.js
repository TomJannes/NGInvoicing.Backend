'use strict';

var Customer = require('../model/customer');
var queryHelper = require('../../../queryHelpers');

exports.findCustomers = function (req, res, next) {
    var searchParams = {};
    if (req.query.name) searchParams.name = { $regex: new RegExp(`^${req.query.name}`, 'i') };
    if (req.query.kbo) searchParams.kbo = { $regex: new RegExp(`^${req.query.kbo}`, 'i') };

    var countQuery = Customer.count(searchParams);
    var query = Customer.find(searchParams);

    query = queryHelper.handleSorting(query, req.query);
    query = queryHelper.handlePaging(query, req.query);

    var items;
    var count;

    query.exec().then(function(result){
        items = result;
        return countQuery.exec();
    }).then(function(count){
        res.setHeader('x-total-count', count)
        return res.json(items);
    }).catch(function(err){
        return next(err);
    });
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
            res.status(404)
        }
        res.json(result);
    })
};