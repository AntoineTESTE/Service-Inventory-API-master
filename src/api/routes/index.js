'use strict';

module.exports = (server, handlers, validations) => {
  require('./repos.routes')(server, handlers, validations);
};
