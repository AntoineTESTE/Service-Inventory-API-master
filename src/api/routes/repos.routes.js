'use strict';

module.exports = (server, handlers, validations) => {
  server.route({
    method: 'GET',
    path: '/repos',
    config: {
      description: 'Github repos',
      notes: ['api'],
      tags: ['api'],
      handler: handlers.repos.getAll,
      validate: validations.repos.getAll
    }
  });
}
