'use strict';

module.exports = (server, services) => {
  return {
    repos: require('./github')(server, services),
  };
};