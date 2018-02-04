'use strict';

const AddressModel = require('./../../shared/model/address');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, required: true },
    kbo: { type: String, required: true },
    phone: { type: String, required: true },
    iban: { type: String, required: true },
    address: AddressModel.schema
});

module.exports = mongoose.model('Profile', ProfileSchema);