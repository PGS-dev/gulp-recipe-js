'use strict';

module.exports = function ($, config) {
    var _ = $.lodash;

    $.utils.checkMandatory(config, ['sources.js']);

    return _.merge({
        paths: {
            tmp: 'tmp'
        },
        tasks: {
            js: 'js',
            watchJs: 'watch:js'
        }
    }, config);
};