'use strict';

const InvoiceLineModel = require('./invoiceLine')
const CustomerModel = require('./../../customer/model/customer');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    customer: CustomerModel.schema,
    number: { type: Number, required: false },
    invoiceDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    totalInc: { type: Number, required: true },
    totalVat: { type: Number, required: true },
    lines: [InvoiceLineModel.schema]
});

InvoiceSchema.pre('save', function (next) {
    var invoice = this;
    const invoiceYear = this.invoiceDate.getFullYear();
    const lowerbound = invoiceYear * 1000;
    const upperbound = (invoiceYear + 1) * 1000;
    this.constructor.findOne({ number: { $gt: lowerbound, $lt: upperbound } })
        .sort({createdAt: -1})
        .exec()
        .then(function(result) {
            if(result === null) {
                invoice.number = lowerbound + 1;
            } else {
                invoice.number = result.number + 1;
            }
            next();
        })
        .catch(function(err){
            return next(err);
        })
});

module.exports = mongoose.model('Invoice', InvoiceSchema);