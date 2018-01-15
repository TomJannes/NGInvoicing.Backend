'use strict';
module.exports = function (app) {
  var invoice = require('./controller/invoice');

  app.route('/invoice')
    .get(invoice.findInvoices)
    .post(invoice.createInvoice);
  
  app.route('/invoice/:invoiceId')
    .get(invoice.getInvoice)
    .put(invoice.updateInvoice);
};