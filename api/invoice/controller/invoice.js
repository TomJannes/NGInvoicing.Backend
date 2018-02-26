'use strict';

var Invoice = require('../model/invoice');
var queryHelper = require('../../../utils/queryHelpers');

exports.findInvoices = function (req, res, next) {
    var searchParams = {};
    if (req.query.number) searchParams.number = req.query.number;
    if (req.query['customer.name']) searchParams['customer.name'] = { $regex: new RegExp(`^${req.query['customer.name']}`, 'i') };

    return queryHelper.find(req, res, next, Invoice, searchParams);
};

exports.createInvoice = function (req, res, next) {
    var newInvoice = new Invoice(req.body);
    newInvoice.save(function (err, invoice) {
        if (err) {
            return next(err);
        }
        return res.json(newInvoice);
    })
};

exports.getInvoice = function (req, res, next) {
    var id = req.params.invoiceId;
    Invoice.findById(id, function (err, invoice) {
        if (err) {
            return next(err);
        }
        if (!invoice) {
            return res.status(404).send('Not found');
        }
        return res.json(invoice);
    });
};

exports.updateInvoice = function (req, res, next) {
    var id = req.params.invoiceId;
    Invoice.findByIdAndUpdate(id, { $set: req.body }, function (err, invoice) {
        if (err) {
            return next(err);
        }
        if (!invoice) {
            return res.status(404).send('Not found');
        }
        return res.json(invoice);
    })
};