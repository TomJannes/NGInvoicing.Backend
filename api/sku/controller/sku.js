'use strict';

var Sku = require('../model/sku');
var queryHelper = require('../../../utils/queryHelpers');

exports.findSkus = function (req, res, next) {
    var searchParams = {};
    if (req.query.name) searchParams.name = { $regex: new RegExp(`^${req.query.name}`, 'i') };
    if (req.query.price) searchParams.price = req.query.price;
    if (req.query.vat) searchParams.vat = req.query.vat;
    return queryHelper.find(req, res, next, Sku, searchParams);
};

exports.createSku = function (req, res, next) {
    var newSku = new Sku(req.body);
    newSku.save(function (err, sku) {
        if (err) {
            return next(err);
        }
        return res.json(newSku);
    })
};

exports.getSku = function (req, res, next) {
    var id = req.params.skuId;
    Sku.findById(id, function (err, sku) {
        if (err) {
            return next(err);
        }
        if (!sku) {
            return res.status(404).send('Not found');
        }
        return res.json(sku);
    });
};

exports.updateSku = function (req, res, next) {
    var id = req.params.skuId;
    Sku.findByIdAndUpdate(id, { $set: req.body }, function (err, sku) {
        if (err) {
            return next(err);
        }
        if (!sku) {
            return res.status(404).send('Not found');
        }
        return res.json(sku);
    })
};

exports.deleteSku = function (req, res, next) {
    var id = req.params.skuId;
    Sku.findByIdAndRemove(id, function (err, result) {
        if (err) {
            return next(err);
        }
        if (!sku) {
            return res.status(404).send('Not found');
        }
        return res.json(result);
    })
};