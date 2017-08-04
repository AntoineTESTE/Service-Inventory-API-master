'use strict';

module.exports = (models) => {
  return {
    repos: require('./repos')(models)
  };
};
