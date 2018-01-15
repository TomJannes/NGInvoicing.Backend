"use strict";
const CustomerTypeModel = require('./customerType');
const AddressModel = require('./../../shared/model/address');
const ContactModel = require('./contact');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, required: true },
    kbo: { type: String, required: true },
    type: CustomerTypeModel.schema,
    address: AddressModel.schema,
    contacts: [ContactModel.schema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);