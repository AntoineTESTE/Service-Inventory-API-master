'use strict';

module.exports = (server, models) => {
  const handlers = require('./handlers')(models);
  const validations = require('./validations')();

  require('./routes')(server, handlers, validations);
};
