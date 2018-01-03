'use strict';

const logger = require('./logger');

exports.logErrors = function(err, req, res, next) {
    logger.error(err.stack)
    next(err)
}

exports.handleErrors = function(err, req, res, next) {
    res.status(500).send({ error: 'An error occurred and was sent to the administrator of the website.'});
}