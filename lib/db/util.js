var util = require('util');
var Transform = require('stream').Transform;
var Readable = require('stream').Readable;
var uuid = require('node-uuid');

exports.join = function () {
  var elems = Array.prototype.slice.call(arguments);
  return elems.join('/');
};

exports.split = function (keypath, options) {
  return {
    collection: options.collection || keypath[0],
    key: options.key || keypath[1],
    version: options.version || keypath[2]
  };
};

util.inherits(DestroyStream, Transform);

function DestroyStream (options) {
  if (!(this instanceof DestroyStream))
    return new DestroyStream(options);

  Transform.call(this, options);
}

DestroyStream.prototype._transform = function (chunk, encoding, done) {
  console.log(arguments);
  if (chunk.key)  return done(null, chunk);
  else            return done(null, { key: chunk });
};

exports.DestroyStream = DestroyStream;

exports.uuid = function () {
  return uuid.v1();
};
