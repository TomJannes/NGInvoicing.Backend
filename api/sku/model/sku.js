'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SkuSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, required: true },
    vat: { type: Number, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sku', SkuSchema);