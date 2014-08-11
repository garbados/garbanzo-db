var util = require('./util');

function get (collection, key, version, done) {
  // TODO return stream
  function _done (err, doc, version) {
    if (err) {
      done(err);
    } else {
      done(null, {
        path: {
          collection: collection,
          key: key,
          version: version
        },
        value: doc
      });
    }
  }

  var keypath = util.join(collection, key);
  if (typeof(version) !== 'string') {
    done = version;
    return this._db.get(keypath, _done);
  } else {
    return this._db.get(keypath, {
      version: version
    }, _done);
  }
}

function all (collection, options, done) {
  var keypath = util.join(collection);
  var rs = this._db.createReadStream(keypath, options);

  if (!done) return rs;

  var elems = [];
  var errors = [];

  return rs
  .on('error', errors.push)
  .on('data', function (data) {
    elems.push({
      path: util.split(data.key, { version: data.version }),
      value: data.value
    });
  })
  .on('close', function () {
    if (errors.length)  return done(errors[0]);
    else                return done(null, elems);
  });
}

function create (collection, obj, done) {
  var key = util.uuid();
  var keypath = util.join(collection, key);
  return this._db.put(keypath, obj, done);
}

function update (collection, key, obj, version, done) {
  var keypath = util.join(collection, key);
  if (typeof(version) === 'string') {
    return this._db.put(keypath, {}, obj, done);
  } else {
    done = version;
    return this._db.put(keypath, obj, done);
  }
}

function destroy (collection, key, version, done) {
  // TODO return stream
  if (typeof(collection) !== 'string') {
    done = collection;
    return destroy_all.call(this, done);
  }
  if (typeof(key) !== 'string') {    
    done = key;
    return destroy_collection.call(this, collection, done);
  }
  if (typeof(version) !== 'string') {
    done = version;
    return destroy_history.call(this, collection, key, done);
  }

  var keypath = util.join(collection, key);
  return this._db.del(keypath, {
    version: version
  }, done);
}

function destroy_all (done) {
  var parser = util.DestroyStream();
  var ws = this._db.createWriteStream({ type: 'del' });
  var rs = this._db.createKeyStream().pipe(parser).pipe(ws);

  if (!done) {
    return rs;
  } else {
    var errors = [];

    return rs
    .on('error', errors.push)
    .on('end', function () {
      if (errors.length)  return done(errors[0]);
      else                return done();
    });
  }
}

function destroy_collection (collection, done) {
  var keypath = util.join(collection);
  var parser = util.DestroyStream();
  var ws = this._db.createWriteStream({ type: 'del' });
  var rs = this._db.createKeyStream({
    lte: keypath,
    gte: keypath + '~'
  }).pipe(parser).pipe(ws);

  if (!done) {
    return rs;
  } else {
    var errors = [];

    return rs
    .on('error', errors.push)
    .on('end', function () {
      if (errors.length)  return done(errors[0]);
      else                return done();
    });
  }
}

function destroy_history (collection, key, done) {
  var keypath = util.join(collection, key);
  var parser = util.DestroyStream();
  var rs = this._db.createKeyStream(keypath).pipe(parser);
  var ws = this._db.createWriteStream({ type: 'del' });
  var stream = rs.pipe(ws);

  if (!done) return stream;

  var errors = [];
  return stream
  .on('error', errors.push)
  .on('end', function () {
    if (errors.length)  return done(errors[0]);
    else                return done();
  });
}

function batch (docs, done) {

}

function stream () {

}

exports.get = get;
exports.all = all;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.batch = batch;
exports.stream = stream;
