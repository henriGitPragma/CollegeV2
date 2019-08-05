const { name, version } = require('../../package.json');
const config = require('../config');
const definitions = require('./definitions');

module.exports = {
  openapi: '3.0.0',
  servers: [{
    url: config.root,
  }],
  info: {
    title: name,
    version,
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
    schemas: definitions,
    responses: {
      Error: {
        description: 'An error occured',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
  paths: {},
};
