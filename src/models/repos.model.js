'use strict';

module.exports = () => {
  return {
    getAll() {
      return when({
        nodes: [{
          name: 'BOv2-plugins-moderation-backend',
          href: 'https://github.com/livee/BOv2-plugins-moderation-backend',
          desc: '',
          type: 'repo',
          created_at: '2017-07-24T15:18:20Z',
          updated_at: '2017-07-26T16:10:57Z'
        }, {
          desc: 'fetch messages to moderate from RabbitMQ',
          href: '',
          name: 'RabbitMQ#moderation',
          type: 'queue'
        }, {
          desc: 'store and retrieve state of messages',
          href: '',
          name: 'PostgreSQL#messages-moderation',
          type: 'database'
        }, {
          name: 'BOv2-plugins-moderation-frontend',
          href: 'https://github.com/livee/BOv2-plugins-moderation-frontend',
          desc: '',
          type: 'repo',
          created_at: '2017-07-24T15:18:34Z',
          updated_at: '2017-07-24T15:18:52Z'
        }],
        links: [{
          source: 'RabbitMQ#moderation',
          target: 'BOv2-plugins-moderation-backend',
          href: ''
        }, {
          source: 'BOv2-plugins-moderation-backend',
          target: 'BOv2-plugins-moderation-frontend',
          type: 'repo'
        }, {
          source: 'BOv2-plugins-moderation-frontend',
          target: 'BOv2-plugins-moderation-backend',
          type: 'repo'
        }, {
          source: 'BOv2-plugins-moderation-backend',
          target: 'PostgreSQL#messages-moderation',
          type: 'database'
        }, {
          source: 'PostgreSQL#messages-moderation',
          target: 'BOv2-plugins-moderation-backend',
          type: 'database'
        }]
      });
    }
  };
};
