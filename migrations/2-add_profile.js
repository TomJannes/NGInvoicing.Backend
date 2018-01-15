'use strict';

module.exports.id = "add_profile";

module.exports.up = function (done) {
  var coll = this.db.collection('Profile');
  coll.insert({ name: 'Test consult', kbo: '0123456789', address: { street: 'test street', number: '123', zip: '2000', place: 'Antwerp' } });
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};