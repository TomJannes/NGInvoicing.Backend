'use strict';
const morgan = require('morgan');

module.exports = function (app) {
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        }, stream: process.stderr
    }));

    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode >= 400
        }, stream: process.stdout
    }));
}