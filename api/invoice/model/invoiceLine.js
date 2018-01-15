'use strict';

const SkuModel = require('./../../sku/model/sku');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InvoiceLineSchema = new Schema({
    sku: SkuModel.schema,
    vat: { type: Number, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    total: { type: Number, required: true },
    totalInc: { type: Number, required: true },
    totalVat: { type: Number, required: true }
},{ _id : false });

module.exports = mongoose.model('InvoiceLine', InvoiceLineSchema);