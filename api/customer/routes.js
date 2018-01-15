'use strict';
module.exports = function (app) {
  var customer = require('./controller/customer');
  var customerType = require('./controller/customerType');

  app.route('/customer')
    .get(customer.findCustomers)
    .post(customer.createCustomer);


  app.route('/customer/:customerId')
    .get(customer.getCustomer)
    .put(customer.updateCustomer)
    .delete(customer.deleteCustomer);

  app.route('/customerType')
    .get(customerType.findCustomerTypes);
};