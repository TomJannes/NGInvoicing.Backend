'use strict';
module.exports = function (app) {
  var profile = require('./controller/profile');

  app.route('/profile')
    .get(profile.getProfile);

  app.route('/profile/:profileId')
    .put(profile.updateProfile);
};