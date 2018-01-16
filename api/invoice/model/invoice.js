'use strict';

const InvoiceLineModel = require('./invoiceLine')
const CustomerModel = require('./../../customer/model/customer');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    customer: CustomerModel.schema,
    number: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    totalInc: { type: Number, required: true },
    totalVat: { type: Number, required: true },
    lines: [InvoiceLineModel.schema]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);