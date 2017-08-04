// Routes Github

'use strict';

// Export des Routes des stats
module.exports = (server, handlers) => {

  server.route({
    method: 'POST',
    path: '/repos',
    config: {
      description: 'Github repos',
      notes: ['api'],
      tags: ['api'],
      handler: repos.getRepos,
    }
  });
}