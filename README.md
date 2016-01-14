[![Build Status](https://travis-ci.org/kopa-app/metalsmith-git-builder.svg)](https://travis-ci.org/kopa-app/metalsmith-git-builder)

# Metalsmith  - Git-Builder

Metalsmith plugin that builds into a directory named after current git sha and symlinks it into another directory.

## Installation

```bash
npm install metalsmith-git-builder --save
```

## Usage

```javascript
var metalsmith = require('metalsmith');
var builder = require('metalsmith-git-builder');
var build = builder();

metalsmith(__dirname)
  .use(build({
    directory: 'current' // default
  }))
  .build(function (err, files) {
    if (err) {
      throw err;
    }

    build.make();
  });
```

This will create `build/[git-commit-sha]` and a symlink to the same folder under `build/current`.
