'use strict';

module.exports = () => {
  return {
    MarkdownService: require('./MarkdownService')(),
    GithubService: require('./GithubService')()
  };
};
