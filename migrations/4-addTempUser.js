'use strict';

module.exports.id = "addTempUser";

module.exports.up = function (done) {
  var coll = this.db.collection('User');
  coll.insert({ firstName: "test", lastName: "test", email:"test@test.be", password:"$2a$10$HQhUz/VgyNeVjANk1mTG3ugm4raXvdQlIbXfqx01O1zS/RgwQInIu" });
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};