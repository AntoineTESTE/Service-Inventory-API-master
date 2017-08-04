'use strict';

const GitHubApi = require('github');
const _ = require('lodash');
const ORG_NAME = 'livee';
const assert = require('assert');

module.exports = () => {
  const { username, password  } = config.github;
  assert(!_.isEmpty(username), 'You should provide a github account (GITHUB_USERNAME | GITHUB_PASSWORD)');

  github.authenticate({
    type: 'basic',
    username,
    password
  });

  return {
    getRepos(f) {
      const per_page = 100;
      const acc = [];
      const run = (page = 0) => {
        github.repos.getForOrg({
          org: ORG_NAME,
          type: 'private',
          page,
          per_page
        }, (err, repos) => {
          if (err) {
            return f(err);
          }
          acc.push(...repos.data.map(repo => {
            return {
              name: repo.name,
              href: repo.html_url,
              desc: repo.description || '',
              type: 'repo',
              created_at: repo.created_at,
              updated_at: repo.updated_at
            }
          }));
          if (repos.data.length === per_page) {
            return run(page + 1);
          }
          f(null, _.uniq(acc));
        });
      };
    }
  };
};
