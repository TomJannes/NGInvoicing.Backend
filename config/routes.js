'use strict';
const logger = require('../utils/logger');

module.exports = function (app) {
    require('../api/customer/routes')(app);
    require('../api/sku/routes')(app);
    require('../api/profile/routes')(app);
    require('../api/invoice/routes')(app);
    require('../api/user/routes')(app);

    app.use(function (req, res, next) {
        logger.error('404 page requested');
        logger.debug('debug message');
        logger.info('info message');
        res.status(404).send('This page does not exist!');
    });
}