'use strict';
const passport = require('passport');
const authentication = require('./../../passport/authentication');

module.exports = function (app) {
  var invoice = require('./controller/invoice');
  var invoiceState = require('./controller/invoiceState');
  var download = require('./controller/download');

  app.route('/invoice')
    .all(passport.authenticate("jwt", { session: false }))
    .get(invoice.findInvoices)
    .post(invoice.createInvoice);

  app.route('/invoice/:invoiceId')
    .all(passport.authenticate("jwt", { session: false }))
    .get(invoice.getInvoice)
    .put(invoice.updateInvoice);

  app.route('/invoicestate')
    .all(passport.authenticate("jwt", { session: false }))
    .get(invoiceState.findInvoiceStates);

  app.route('/download/invoice/:invoiceId')
    .all(passport.authenticate("jwt", { session: false }))
    .get(download.generateInvoice);
};