'use strict';

module.exports = () => {
  return {
    repos: require('./repos.validations')()
  }
};
