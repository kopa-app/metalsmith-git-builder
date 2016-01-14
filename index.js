'use strict';

var cp = require('child_process');
var path = require('path');
var fs = require('fs');

module.exports = function (options) {
  options = options || {};
  var commit = null;
  var destination = null;
  var originalDestination = null;
  options.directory = options.directory || 'current';

  function builder() {
    return function (files, metalsmith, callback) {
      originalDestination = metalsmith.destination();

      cp.exec('git rev-parse master', function (err, stdout, stderr) {
        if (err) {
          throw err;
        }

        commit = stdout.trim();
        destination = path.join(originalDestination, commit);

        // set new destination
        metalsmith.destination(destination);
        callback();
      });
    };
  };

  builder.destination = function () {
    return destination;
  };

  builder.make = function () {
    var currentDir = path.join(originalDestination, options.directory);
    fs.symlinkSync(destination, currentDir);
  };

  return builder;
};
