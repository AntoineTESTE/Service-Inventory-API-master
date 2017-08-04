'use strict';

global._ = require('lodash');
global.when = require('when');
global.async = require('async');
global.logger = require('./logger');
global.config = require('./config')(logger);
global.request = require('requestretry').defaults({
  json: true,
  fullResponse: true,
  retryStrategy(err, response, body) {
    return err || response.statusCode === 'ETIMEDOUT';
  }
});
