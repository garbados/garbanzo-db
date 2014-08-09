# garbanzo-db

Feature-full DB inspired by [Orchestrate](http://orchestrate.io/), using [LevelDB](https://code.google.com/p/leveldb/).

[![Build Status](https://travis-ci.org/garbados/garbanzo-db.svg)](https://travis-ci.org/garbados/garbanzo-db)
[![Coverage Status](https://img.shields.io/coveralls/garbados/garbanzo-db.svg)](https://coveralls.io/r/garbados/garbanzo-db)

## Features

* Key/Value storage: read, create, update, and delete JSON data
* [Caching](#caching)
* [Incremental MapReduce](#dbmapreducecollection-key-map-reduce)
* [Fulltext search](#dbfulltext_querycollection-query-callback)
* [MQL queries](#dbmql_querycollection-query-callback)
* [SQL queries](#dbsql_querycollection-query-callback)
* [Geo queries](#dbgeo_querycollection-query-callback)
* [Graph queries](#dbchangescollection-key-callback)
* [Changes feeds](#dbchangescollection-key-callback)
* TODO scaling lol

## Install

To use garbanzo-db in projects, install like this:

    npm install garbanzo-db

To use garbanzo-db as a standalone database server, install like this:

    sudo npm install -g garbanzo-db

## Usage

garbanzo-db is simple:

``` javascript
var garbanzo = require('garbanzo-db');
var db = garbanzo({
    db: require('leveldown'),
    cache: require('memdown'),
    path: 'path/to/database'
});

db.get('a_collection', 'some_key', 'optional_version', function (err, doc) {
    console.log(doc);
    // {
    //  path: {
    //    collection: 'a_collection',
    //    key: 'some_key',
    //    version: 'optional_version'
    //  },
    //  value: {
    //    text: 'hello, stranger!'
    //  }
    // }
});
```

### Options

* `db`: the storage backend garbanzo-db uses to store data. Defaults to [LevelDOWN][].
* `cache`: an optional storage engine to use as a cache. Defaults to none, but if you want a cache, I recommend [MemDown][].
* `cache_size`: an optional integer indicating how many objects to store in the cache. Defaults to 100, but only matters if caching is enabled.
* `path`: path to the database folder, as in, where garbanzo-db should store data. Defaults to `./.garbanzo`.

### Caching

If you enable garbanzo-db's cache, the last N read responses will be stored in the cache, where N is the value of the `cache_size` option, or 100. During reads, if the cache is enabled, the cache is always tried first.

### API Reference

All garbanzo-db methods return a [ReadStream](http://nodejs.org/api/stream.html#stream_class_stream_readable), and accept as their last argument a callback function which fires when the document has been fully read.

#### Table of Contents

* [db.get(collection, key, version, [callback])](#dbgetcollection-key-version-callback)
* [db.create(collection, doc, [callback])](#dbcreatecollection-doc-callback)
* [db.update(collection, key, doc, [version], [callback])](#dbupdatecollection-key-doc-version-callback)
* [db.destroy(collection, key, [version], [callback])](#dbdestroycollection-key-version-callback)
* [db.mapreduce(collection, key, map, reduce)](#dbmapreducecollection-key-map-reduce)
* [db.mql_query(collection, query, [callback])](#dbmql_querycollection-query-callback)
* [db.fulltext_query(collection, query, [callback])](#dbfulltext_querycollection-query-callback)
* [db.sql_query(collection, query, [callback])](#dbsql_querycollection-query-callback)
* [db.geo_query(collection, query, [callback])](#dbgeo_querycollection-query-callback)
* [db.graph_query(collection, query, [callback])](#dbgraph_querycollection-query-callback)
* [db.mr_query(collection, key, query, [callback])](#dbmr_querycollection-query-callback)
* [db.changes([collection], [key], [callback])](#dbchangescollection-key-callback)

#### db.get(collection, key, version, [callback])

#### db.create(collection, doc, [callback])

#### db.update(collection, key, doc, [version], [callback])

#### db.destroy(collection, key, [version], [callback])

#### db.mapreduce(collection, key, map, reduce)

#### db.mql_query(collection, query, [callback])

#### db.fulltext_query(collection, query, [callback])

#### db.sql_query(collection, query, [callback])

#### db.geo_query(collection, query, [callback])

#### db.graph_query(collection, query, [callback])

#### db.mr_query(collection, key, query, [callback])

#### db.changes([collection], [key], [callback])

## Usage as Server

garbanzo-db comes bundled with an HTTP server, so you can interact with it over HTTP like CouchDB or Orchestrate.

To start the server, just run:

    garbanzo-db
    # Now running on port 3000

This starts garbanzo-db with the following options:

* `db`: [LevelDOWN][]
* `cache`: [MemDOWN][]
* `path`: './.garbanzo'
* `port`: 3000

You can set `path` and `port` as flags:

    garbanzo-db --port 5000 --path path/to/put/data

### `GET /`

### `GET /[collection]`

### `GET /[collection]/[key]`

### `GET /[collection]/[key]/[version]`

### `GET /[collection]/_mapreduce`

### `GET /[collection]/_mapreduce/[key]`

### `POST /[collection]`

### `POST /[collection]/_mapreduce`

### `PUT /[collection]/[key]`

### `PUT /[collection]/[key]/[version]`

### `PUT /[collection]/_mapreduce/[key]`

### `DELETE /[collection]`

### `DELETE /[collection]/[key]`

### `DELETE /[collection]/[key]/[version]`

### `DELETE /[collection]/_mapreduce/[key]`

## Tests

To run the test suite:

    npm test

## License

[ISC](http://opensource.org/licenses/ISC), yo.

[LevelDOWN]: https://github.com/rvagg/node-leveldown/
[MemDOWN]: https://github.com/rvagg/memdown
