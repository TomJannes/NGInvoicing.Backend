'use strict';
module.exports = function (app) {
  var profile = require('./controller/profile');

  app.route('/profiles/:profileId')
    .get(profile.getProfile)
    .put(profile.updateProfile);
};