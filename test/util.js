var mock = require('mock-fs');

function setup () {
  this.dbpath = './.garbanzo';
  var mock_options = {};
  mock_options[this.dbpath] = {};
  mock(mock_options);
}

function cleanup () {
  mock.restore();
}

exports.setup = setup;
exports.cleanup = cleanup;
