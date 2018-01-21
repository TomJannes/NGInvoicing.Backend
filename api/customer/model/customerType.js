"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CustomerTypeSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: { type: String, required: true },
    sortOrder: { type: Number, required: true }
});

module.exports = mongoose.model('CustomerType', CustomerTypeSchema);