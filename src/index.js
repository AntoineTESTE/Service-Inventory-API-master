'use strict';

module.exports = (server) => {
  const models = require('./models')();

  require('./api')(server, models);

  return when();
};
