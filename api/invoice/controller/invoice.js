'use strict';

var Invoice = require('../model/invoice');
var queryHelper = require('../../../utils/queryHelpers');

exports.findInvoices = function (req, res, next) {
    var searchParams = {};
    if (req.query.name) searchParams.name = { $regex: new RegExp(`^${req.query.name}`, 'i') };
    if (req.query.kbo) searchParams.kbo = { $regex: new RegExp(`^${req.query.kbo}`, 'i') };

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
            return res.status(404);
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
            return res.status(404)
        }
        return res.json(invoice);
    })
};