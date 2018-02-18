'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const config = require('./config');
const errorHandling = require('./utils/errorHandling');

const passport = require('passport');

const port = process.env.PORT || 3000;
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
    mongoose.connect(config.db, options);
    return mongoose.connection;
}