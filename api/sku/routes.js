'use strict';
module.exports = function (app) {
  var sku = require('./controller/sku');

  app.route('/skus')
    .get(sku.findSkus)
    .post(sku.createSku);


  app.route('/skus/:skuId')
    .get(sku.getSku)
    .put(sku.updateSku)
    .delete(sku.deleteSku);
};