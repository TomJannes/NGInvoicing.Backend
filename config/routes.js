'use strict';
const logger = require('../logger');

module.exports = function (app) {
    require('../api/customer/routes')(app);
    require('../api/sku/routes')(app);

    app.use(function (req, res, next) {
        logger.error('404 page requested');
        logger.debug('debug message');
        logger.info('info message');
        res.status(404).send('This page does not exist!');
    });
}