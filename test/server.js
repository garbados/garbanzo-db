var util = require('./util');
var async = require('async');

var garbanzo;
if (process.env.NODE_ENV === 'development') {
  garbanzo = require('../');
} else {
  garbanzo = require('../lib-cov');
}

describe.skip('garbanzo-db', function () {
  before(util.setup);
  after(util.cleanup);

  before(function () {
    this.server = garbanzo.server({
      path: this.dbpath
    });
  });

  after(function () {
    this.server.close();
  });

  it.skip('GET /', function (done) {

  });

  it.skip('GET /[collection]', function (done) {

  });

  it.skip('GET /[collection]/[key]', function (done) {

  });

  it.skip('GET /[collection]/[key]/[version]', function (done) {

  });

  it.skip('GET /[collection]/_mapreduce', function (done) {

  });

  it.skip('GET /[collection]/_mapreduce/[key]', function (done) {

  });

  it.skip('POST /[collection]', function (done) {

  });

  it.skip('POST /[collection]/_mapreduce', function (done) {

  });

  it.skip('POST /_replicate', function (done) {

  });

  it.skip('PUT /[collection]/[key]', function (done) {

  });

  it.skip('PUT /[collection]/[key]/[version]', function (done) {

  });

  it.skip('PUT /[collection]/_mapreduce/[key]', function (done) {

  });

  it.skip('DELETE /[collection]', function (done) {

  });

  it.skip('DELETE /[collection]/[key]', function (done) {

  });

  it.skip('DELETE /[collection]/[key]/[version]', function (done) {

  });

  it.skip('DELETE /[collection]/_mapreduce/[key]', function (done) {

  });
});