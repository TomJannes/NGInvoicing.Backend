'use strict';

var Sku = require('../model/sku');
var queryHelper = require('../../../queryHelpers');

exports.findSkus = function (req, res, next) {
    var searchParams = {};
    if (req.query.name) searchParams.name = { $regex: new RegExp(`^${req.query.name}`, 'i') };

    var countQuery = Sku.count(searchParams);
    var query = Sku.find(searchParams);

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
            return res.status(404);
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
            return res.status(404)
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
            res.status(404)
        }
        res.json(result);
    })
};