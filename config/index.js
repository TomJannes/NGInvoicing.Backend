var path = require('path');
var development = require('./env/development');
var production = require('./env/production');
var defaults = {
    root: path.normalize(__dirname + '/..')
};

/**
 * Expose
 */

module.exports = {
    development: Object.assign({}, development, defaults),
    production: Object.assign({}, production, defaults)
}[process.env.NODE_ENV || 'development'];