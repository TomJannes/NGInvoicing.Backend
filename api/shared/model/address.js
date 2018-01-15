"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: { type: String, required: true },
    number: { type: String, required: true },
    bus: { type: String, required: false },
    zip: { type: String, required: true },
    place: { type: String, required: true }
},{ _id : false });

module.exports = mongoose.model('Address', AddressSchema);