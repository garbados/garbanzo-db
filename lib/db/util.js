var util = require('util');
var Transform = require('stream').Transform;
var Readable = require('stream').Readable;

exports.join = function () {
  var elems = Array.prototype.slice.call(arguments).map(function (value) {
    return encodeURIComponent(value);
  });

  return elems.join('/');
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
