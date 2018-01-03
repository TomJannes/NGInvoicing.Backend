'use strict';

module.exports.id = "create-customertypes";

module.exports.up = function (done) {
  var coll = this.db.collection('CustomerType');
  coll.insert({ name: 'Company' });
  coll.insert({ name: 'Person' });
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};