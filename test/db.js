var util = require('./util');

var garbanzo;
if (process.env.NODE_ENV === 'development') {
  garbanzo = require('../');
} else {
  garbanzo = require('../lib-cov');
}

describe('garbanzo-db', function () {
  before(util.setup);
  after(util.cleanup);

  before(function () {
    this.db = garbanzo.db({
      path: this.dbpath
    });
  });

  it.skip('CRUD', function (done) {

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