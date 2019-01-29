const _ = require('lodash'),
  baseConfig = require('../wdio.conf');

exports.config = _.merge(baseConfig.config, {
  baseUrl: 'localhost'
});
