'use strict';

module.exports.id = "addInvoiceStates";

module.exports.up = function (done) {
  var coll = this.db.collection('InvoiceState');
  coll.insert({ name: 'Created', sortOrder: 1 });
  coll.insert({ name: 'Generated', sortOrder: 2 });
  coll.insert({ name: 'Sent', sortOrder: 3 });
  coll.insert({ name: 'Payed', sortOrder: 4 });
  coll.insert({ name: 'Denied', sortOrder: 5 });
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};