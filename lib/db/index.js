var EventEmitter = require('events').EventEmitter;

function GarbanzoDB (options) {
  return this;
}

GarbanzoDB.prototype.get = function (collection, key, version, done) {

};

GarbanzoDB.prototype.create = function (collection, obj, done) {

};

GarbanzoDB.prototype.update = function (collection, key, obj, version, done) {

};

GarbanzoDB.prototype.destroy = function (collection, key, version, done) {

};

GarbanzoDB.prototype.batch = function (docs, done) {

};

GarbanzoDB.prototype.stream = function () {

};

GarbanzoDB.prototype.mapreduce = function (collection, key, map, reduce) {

};

GarbanzoDB.prototype.mql_query = function (collection, query, done) {

};

GarbanzoDB.prototype.fulltext_query = function (collection, query, done) {

};

GarbanzoDB.prototype.sql_query = function (collection, query, done) {

};

GarbanzoDB.prototype.geo_query = function (collection, query, done) {

};

GarbanzoDB.prototype.graph_query = function (collection, query, done) {

};

GarbanzoDB.prototype.mr_query = function (collection, key, query, done) {

};

GarbanzoDB.prototype.changes = function (collection, key, done) {

};

GarbanzoDB.prototype.replicate = function (other_db, options, done) {

};

module.exports = GarbanzoDB;