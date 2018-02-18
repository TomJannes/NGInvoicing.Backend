'use strict';

const passport = require('passport');
const authentication = require('./../../passport/authentication');

module.exports = function (app) {
  var customer = require('./controller/customer');
  var customerType = require('./controller/customerType');

  app.route('/customer')
    .all(passport.authenticate("jwt", {session: false}))
    .get(customer.findCustomers)
    .post(customer.createCustomer);


  app.route('/customer/:customerId')
    .all(passport.authenticate("jwt", {session: false}))
    .get(customer.getCustomer)
    .put(customer.updateCustomer)
    .delete(customer.deleteCustomer);

  app.route('/customerType')
    .all(passport.authenticate("jwt", {session: false}))
    .get(customerType.findCustomerTypes);
};