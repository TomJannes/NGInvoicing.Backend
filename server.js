'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const errorHandling = require('./utils/errorHandling');
const passport = require('passport');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}

require('./launchMigrations')(mongoURL);
const app = express();
const connection = connect();

require('./passport/authentication')(passport);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./utils/requestLogging')(app);

require('./config/routes')(app);

app.use(errorHandling.logErrors);
app.use(errorHandling.handleErrors)

connection.on('error', err => {
    logger.error(err);
});
connection.on('unhandledRejection', err => {
    logger.error(err)
});
connection.on('disconnected', x => {
    connect();
});
connection.once('open', x => {
    listen();
});

function listen() {
    app.listen(port);
    console.log('NGInvoicing RESTful API server started on: ' + port);
}

function connect() {
    var options = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        poolSize: 10,
        keepAlive: 1
    };
    mongoose.connect(mongoURL, options);
    return mongoose.connection;
}