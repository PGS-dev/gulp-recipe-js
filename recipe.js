'use strict';

/**
 * Js transforming hook provider.
 *
 * Provides hook for js processing and watcher firing only on changed files in development environment.
 * Provides source maps as data urls inside compiled files.
 * Works well with recipes like [gulp-recipe-autoprefixer](https://github.com/PGS-dev/gulp-recipe-autoprefixer).
 *
 * @config paths.tmp temp folder path
 */
module.exports = function ($, config, sources) {

    /* Tasks
     ********/

    /**
     * Runs all hooked actions on all js files and saves them to configured temp directory.
     *
     * @task js
     * @config tasks.js js task name
     */
    function jsTask() {
        return sources.js
            .pipe($.sourcemaps.init)
            .pipe(devProcessJsHook())
            .pipe($.sourcemaps.write)
            .pipe($.gulp.dest, config.paths.tmp)();
    }

    /**
     * Starts Watching all js files and runs hooked actions only on changed files.
     *
     * @task watch:js
     * @config tasks.watchJs watch:js task name
     * @deps js
     */
    function watchJsTask() {
        var path = require('path');
        var fs = require('fs');

        $.utils.watchSource(sources.js, function (vinyl) {
            if(vinyl.event === 'unlink') {
                fs.unlink(path.join(config.paths.tmp, path.relative(vinyl.base, vinyl.path)));
            }
        })
            .pipe($.sourcemaps.init)
            .pipe(devProcessJsHook())
            .pipe($.sourcemaps.write)
            .pipe($.gulp.dest, config.paths.tmp)();
    }

    // register tasks
    $.utils.maybeTask(config.tasks.watchJs, watchJsTask);
    $.utils.maybeTask(config.tasks.js, jsTask);

    /* Provided hooks
     *****************/

    /**
     * Sequential tasks for js processing.
     *
     * @hook pipes.devProcessJs*
     * @hookType sequential
     */
    function devProcessJsHook() {
        return $.utils.sequentialLazypipe($.utils.getPipes('devProcessJs'));
    }

    /* Used hooks
     *************/
    return {
        /**
         * Exports watch:js task to watch combiner.
         *
         * @hooks watch
         */
        compile: config.tasks.js,
        watch: config.tasks.watchJs,
        pipes: {
            assetJs: sources.js
        }
    }
};