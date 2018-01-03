"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true }
},{ _id : false });

module.exports = mongoose.model('Contact', ContactSchema);