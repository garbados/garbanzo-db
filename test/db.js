var async = require('async');
var assert = require('assert');
var leveldown = require('leveldown');

var garbanzo;
if (process.env.NODE_ENV === 'development') {
  garbanzo = require('../');
} else {
  garbanzo = require('../lib-cov');
}

describe('garbanzo-db', function () {
  before(function () {
    this.dbpath = '.garbanzo';
    this.db = garbanzo.db({
      path: this.dbpath
    });

    this.collection = 'a';
    this.key = 'b';
    this.value = { herp: 'derp' };
  });

  afterEach(function (done) {
    leveldown.destroy(this.dbpath, done);
  });

  it('get', function (done) {
    // 1. get, not found
    // 2. add an item
    // 3. get, found
    var self = this;
    async.series([
      function (done) {
        self.db.get(self.collection, self.key, function (err) {
          assert(err.notFound);
          done();
        });
      },
      function (done) {
        var keypath = [self.collection, self.key].map(decodeURIComponent).join('/');
        self.db._db.put(keypath, self.value, done);
      },
      function (done) {
        self.db.get(self.collection, self.key, function (err, doc) {
          assert.deepEqual(doc.value, self.value);
          done();
        });
      }
    ], done);
  });

  it.skip('create', function (done) {

  });

  it.skip('update', function (done) {

  });

  it.skip('destroy', function (done) {

  });

  it.skip('batch', function (done) {

  });

  it.skip('stream', function (done) {

  });

  it.skip('parse nested objects', function (done) {

  });

  it.skip('replication', function (done) {

  });

  it.skip('mapreduce', function (done) {

  });

  it.skip('MQL query', function (done) {

  });

  it.skip('SQL query', function (done) {

  });

  it.skip('fulltext query', function (done) {

  });

  it.skip('geo query', function (done) {

  });

  it.skip('graph query', function (done) {

  });

  it.skip('changes feed', function (done) {

  });
});