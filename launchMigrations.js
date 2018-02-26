'use strict';

const path = require('path')
const mm = require('mongodb-migrations');
// const config = require('./config');

module.exports = function(mongoURL) {
    var migrator =  new mm.Migrator({
        "url": mongoURL
    });
    var migrationPath = path.join(__dirname, 'migrations');
    migrator.runFromDir(migrationPath, function(err, result){
        console.warn(err)
    });
}
