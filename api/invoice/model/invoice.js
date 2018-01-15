'use strict';

const InvoiceLineModel = require('./invoiceLine')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    number: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lines: [InvoiceLineModel.schema]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);