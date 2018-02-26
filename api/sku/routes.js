'use strict';
const passport = require('passport');
const authentication = require('./../../passport/authentication');

module.exports = function (app) {
  var sku = require('./controller/sku');

  app.route('/sku')
    //.all(passport.authenticate("jwt", { session: false }))
    .get(sku.findSkus)
    .post(sku.createSku);


  app.route('/sku/:skuId')
    //.all(passport.authenticate("jwt", { session: false }))
    .get(sku.getSku)
    .put(sku.updateSku)
    .delete(sku.deleteSku);
};