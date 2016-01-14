'use strict';

var expect = require('expect.js');
var metalsmith = require('metalsmith');
var fs = require('fs');
var builder = require('./index');
var cp = require('child_process');

describe('metalsmith-git-builder', function () {
  it('should create build in commitish subdir and link to current', function (done) {
    var build = builder();

    metalsmith(__dirname)
      .source('./fixtures/src')
      .use(build())
      .build(function (err, files) {
        if (err) {
          return done(err);
        }

        build.make();

        cp.exec('git rev-parse master', function (err, stdout, stderr) {
          if (err) {
            return done(err);
          }

          var commit = stdout.trim();
          var fixture = fs.readFileSync('./fixtures/src/index.html', 'utf8');
          expect(fs.existsSync('./build/' + commit)).to.be(true);
          expect(fs.existsSync('./build/current')).to.be(true);
          expect(fs.readFileSync('./build/' + commit + '/index.html', 'utf8')).to.be(fixture);
          expect(fs.readFileSync('./build/current/index.html', 'utf8')).to.be(fixture);
          done();
        });
      });
  });
});
