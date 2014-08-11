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
    async.waterfall([
      function (done) {
        self.db.get(self.collection, self.key, function (err) {
          assert(err.notFound);
          done();
        });
      },
      function (done) {
        self.db.update(self.collection, self.key, self.value, done);
      },
      function (doc, done) {
        self.db.get(self.collection, self.key, doc.path.version, function (err, doc) {
          assert.deepEqual(doc.value, self.value);
          done();
        });
      }
    ], done);
  });

  it('create', function (done) {
    // 1. add an item
    // 2. get the item, to show it's there
    var self = this;
    async.waterfall([
      function (done) {
        self.db.create(self.collection, self.value, done);
      },
      function (doc, done) {
        self.db.get(self.collection, doc.path.key, done);
      }
    ], done);
  });

  it('update', function (done) {
    // 1. add an item by key
    // 2. update that item
    // 3. get all versions, assert there are two

    var self = this;
    async.waterfall([
      function (done) {
        self.db.update(self.collection, self.key, self.value, done);
      },
      function (doc, done) {
        self.db.update(self.collection, self.key, self.value, doc.path.version, done);
      },
      function (doc, done) {
        self.db.get_history(self.collection, self.key, function (err, versions) {
          assert.equal(versions.length, 2);
          done();
        });
      }
    ], done);
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