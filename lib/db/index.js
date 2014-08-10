var levelup = require('levelup');
var leveldown = require('leveldown');
var memdown = require('memdown');
var path = require('path');

var crud = require('./crud');

// plugins
var sublevel = require('level-sublevel');
var levelversion = require('level-version');
var levelcache = require('level-cache');

function add_plugins(plugins, lvlup) {
  return plugins.reduce(function (a, b) {
    return b(a);
  }, lvlup);
}

function GarbanzoDB (options) {
  if (!(this instanceof GarbanzoDB))
    return new GarbanzoDB(options);

  var filepath = path.resolve(options.path || './.garbanzo');
  this._db = add_plugins([
    levelversion
  ], levelup(filepath, {
    db: options.db || leveldown,
    valueEncoding: 'json'
  }));

  return this;
}

GarbanzoDB.prototype.get = crud.get;
GarbanzoDB.prototype.create = crud.create;
GarbanzoDB.prototype.update = crud.update;
GarbanzoDB.prototype.destroy = crud.destroy;
GarbanzoDB.prototype.batch = crud.batch;
GarbanzoDB.prototype.stream = crud.stream;

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