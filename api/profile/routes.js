'use strict';
const passport = require('passport');
const authentication = require('./../../passport/authentication');

module.exports = function (app) {
  var profile = require('./controller/profile');

  app.route('/profile')
    .all(passport.authenticate("jwt", { session: false }))
    .get(profile.getProfile);

  app.route('/profile/:profileId')
    .all(passport.authenticate("jwt", { session: false }))
    .put(profile.updateProfile);
};