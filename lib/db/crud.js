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
  if (typeof(version) !== 'number') {
    done = version;
    return this._db.get(keypath, _done);
  } else {
    return this._db.get(keypath, {
      version: version
    }, _done);
  }
}

function get_history (collection, key, done) {
  var keypath = util.join(collection, key);
  var rs = this._db.createVersionStream(keypath);

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
  .on('end', function () {
    if (errors.length)  return done(errors[0]);
    else                return done(null, elems);
  });
}

function all (collection, options, done) {
  var keypath = util.join(collection);
  if (typeof(options) === 'function') {
    done = options;
    options = {};
  }
  options.gte = options.gte || keypath;
  options.lte = options.lte || keypath + '~';

  var rs = this._db.createReadStream(options);

  if (!done) return rs;

  var elems = [];
  var errors = [];

  return rs
  .on('error', errors.push)
  .on('data', function (data) {
    // TODO modify using transform stream
    data.path = util.split(data.key, { version: data.version });
    elems.push(data);
  })
  .on('end', function () {
    if (errors.length)  return done(errors[0]);
    else                return done(null, elems);
  });
}

function create (collection, obj, done) {
  var key = util.uuid();
  var keypath = util.join(collection, key);
  return this._db.put(keypath, obj, function (err, version) {
    if (err) return done(err);
    return done(null, {
      path: {
        collection: collection,
        key: key,
        version: version
      },
      value: obj
    });
  });
}

function update (collection, key, obj, version, done) {
  function _done (err, version) {
    if (err) return done(err);
    return done(null, {
      path: {
        collection: collection,
        key: key,
        version: version
      },
      value: obj
    });
  }

  var keypath = util.join(collection, key);
  if (typeof(version) === 'number') {
    return this._db.put(keypath, { version: version }, obj, _done);
  } else {
    done = version;
    return this._db.put(keypath, obj, _done);
  }
}

function destroy (collection, key, version, done) {
  if (typeof(collection) !== 'string') {
    done = collection;
    return destroy_all.call(this, done);
  }
  if (typeof(key) !== 'string') {    
    done = key;
    return destroy_collection.call(this, collection, done);
  }
  if (typeof(version) !== 'number') {
    done = version;
    return destroy_history.call(this, collection, key, done);
  }

  var keypath = util.join(collection, key);
  return this._db.del(keypath, {
    version: version
  }, done);
}

function destroy_all (done) {
  var ws = this._db.createWriteStream({ type: 'del' });
  var rs = this._db.createKeyStream().pipe(ws);

  if (!done) return rs;

  var errors = [];

  return rs
  .on('error', errors.push)
  .on('end', function () {
    if (errors.length)  return done(errors[0]);
    else                return done();
  });
}

function destroy_collection (collection, done) {
  var keypath = util.join(collection);
  var ws = this._db.createWriteStream({ type: 'del' });
  var rs = this._db.createKeyStream({
    lte: keypath,
    gte: keypath + '~'
  }).pipe(ws);

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
  var rs = this._db.createKeyStream(keypath);
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
exports.get_history = get_history;
exports.all = all;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.batch = batch;
exports.stream = stream;
