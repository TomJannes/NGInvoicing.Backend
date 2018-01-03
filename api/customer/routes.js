'use strict';
module.exports = function (app) {
  var customer = require('./controller/customer');
  var customerType = require('./controller/customerType');

  app.route('/customers')
    .get(customer.findCustomers)
    .post(customer.createCustomer);


  app.route('/customers/:customerId')
    .get(customer.getCustomer)
    .put(customer.updateCustomer)
    .delete(customer.deleteCustomer);

  app.route('/customerTypes')
    .get(customerType.findCustomerTypes);
};