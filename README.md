# [gulp-recipe](https://github.com/PGSSoft/gulp-recipe-loader)-js [![Dependency Status][depstat-image]][depstat-url]
[![NPM][npm-image]][npm-url]

Js transforming hook provider.

Provides hook for js processing and watcher firing only on changed files in development environment.
Includes source maps as data urls into compiled files.
Works well with recipes like [gulp-recipe-traceur](https://github.com/PGSSoft/gulp-recipe-traceur).

## Tasks
#### js
Runs all hooked actions on all js files and saves them to configured temp directory.

#### watch:js
Starts Watching all js files and runs hooked actions only on changed files.

## Configuration
### [Sources](https://github.com/PGSSoft/gulp-recipe-loader#sources-configuration-syntax)
#### sources.js
> mandatory

Raw js files to be compiled by all js transformers.

> example config:
``` javascript
sources.js = ['app/components/**/*.js', 'app/*.js'];
```

### Paths
#### paths.tmp
> default: 'tmp/'

Compiled js output directory.

### Tasks
#### tasks.js
> default: 'js'

_js_ task name.

#### tasks.watchjs
> default: 'watch:js'

_watch:js_ task name.

## Api
### Provided Hooks
#### pipes.devProcessjs*
> type: sequential

Sequential tasks for js processing.

### Used Hooks
#### watch

Exports watch:js task to watch combiner.

[npm-url]: https://npmjs.org/package/gulp-recipe-js
[npm-image]: https://nodei.co/npm/gulp-recipe-js.png?downloads=true

[depstat-url]: https://david-dm.org/PGSSoft/gulp-recipe-js
[depstat-image]: http://img.shields.io/david/PGSSoft/gulp-recipe-js.svg?style=flat