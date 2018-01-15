'use strict';
module.exports = function (app) {
  var sku = require('./controller/sku');

  app.route('/sku')
    .get(sku.findSkus)
    .post(sku.createSku);


  app.route('/sku/:skuId')
    .get(sku.getSku)
    .put(sku.updateSku)
    .delete(sku.deleteSku);
};