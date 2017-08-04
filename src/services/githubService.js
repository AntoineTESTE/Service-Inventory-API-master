'use strict';

var GitHubApi = require("github");
const _ = require('lodash');

getRepos = (f) => {
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
  run();
};




