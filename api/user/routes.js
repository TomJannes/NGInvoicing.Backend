'use strict';
module.exports = function (app) {
  var user = require('./controller/user');

  app.route('/login')
    .post(user.login);

  app.route('/user')
    .post(user.createUser);

  app.route('/user/:userId')
    .put(user.updateUser);
};