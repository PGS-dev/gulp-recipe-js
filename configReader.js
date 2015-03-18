'use strict';

module.exports = function ($, config) {
    var _ = $.lodash;

    $.utils.checkMandatory(config, ['sources.js']);

    config = _.merge({
        paths: {
            tmp: 'tmp'
        },
        tasks: {
            js: 'js',
            watchJs: 'watch:js'
        }
    }, config);
    config.sources = _.pick(config.sources, 'js');
    return config;
};