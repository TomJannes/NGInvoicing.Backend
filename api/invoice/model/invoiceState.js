'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InvoiceStateSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('InvoiceState', InvoiceStateSchema);