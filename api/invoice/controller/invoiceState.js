'use strict';

var InvoiceState = require('../model/invoiceState');

exports.findInvoiceStates = function (req, res, next) {
    InvoiceState.find().sort('sortOrder').exec(function (err, result) {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
};