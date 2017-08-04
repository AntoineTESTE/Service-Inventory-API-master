'use strict';
require('./bootstrap');

const { MarkdownService } = require('./src/services')();
const ORG_NAME = 'livee';
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});



GithubAuthenticate() {
  github.authenticate({
    type: "basic",
    username: process.env.GITHUB_USERNAME,
    password: process.env.GITHUB_PASSWORD
  });
},


getRepos() {
  var github = new GitHubApi({
    debug: true,
    protocol: "https",
    host: 'api.github.com', // should be api.github.com for GitHub 
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub 
    headers: {
      "user-agent": "livee-repos-crawler" // GitHub is happy with a unique user agent 
    },
    Promise: when,
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects 
    timeout: 10000
  });
},



const getREADME = (repoName, f) => {
  github.repos.getReadme({
    owner: ORG_NAME,
    repo: repoName
  }, (err, README = {}) => {
    f(err, Buffer.from(README.data.content, 'base64').toString());
  });
};

// console.log("err", err);
// REMOVE ME
const currentRepo = {
  name: 'BOv2-plugins-moderation-backend',
  desc: 'moderation backend',
  type: 'repo',
  href: 'https://github.com/livee/BOv2-plugins-moderation-backend'
};

const bulidGraph = () => {
  const repos = [{
    name: 'BOv2-plugins-moderation-backend',
    href: 'https://github.com/livee/BOv2-plugins-moderation-backend',
    desc: '',
    type: 'repo',
    created_at: '2017-07-24T15:18:20Z',
    updated_at: '2017-07-26T16:10:57Z'
  }, {
    name: 'BOv2-plugins-moderation-frontend',
    href: 'https://github.com/livee/BOv2-plugins-moderation-frontend',
    desc: '',
    type: 'repo',
    created_at: '2017-07-24T15:18:34Z',
    updated_at: '2017-07-24T15:18:52Z'
  }]; // remove me




  // getRepos((err, repos) => {
  async.map(repos, (repo, cb) => {
    getREADME(repo.name, (err, README) => {
      MarkdownService.parse(README, (err, dependencies) => {
        if (err) {
          return cb(err);
        }
        cb(null, MarkdownService.fromREADME(dependencies, repo));
      });
    });
  }, (err, repoDependencies) => {
    const globalGraph = repoDependencies.reduce((m, dependencies) => {
      m.nodes.push(...dependencies.nodes);
      m.links.push(...dependencies.links);
      return m;
    }, { nodes: [], links: [] });
    const uniqGraph = {
      nodes: _.uniq(globalGraph.nodes).filter(node => node.type !== 'repo' ? true : !!node.created_at),
      links: _.uniq(globalGraph.links).filter(l => l.target !== l.source)
    };
    console.log("uniqGraph", uniqGraph);
  });
  // });
};

bulidGraph();
