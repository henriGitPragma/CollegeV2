module.exports = {
  type: 'object',
  description: 'An error occurred',
  properties: {
    statusCode: {
      type: 'integer',
      description: 'HTTP status code',
      example: 500,
    },
    error: {
      type: 'string',
      description: 'Error message',
      example: 'internal server error',
    },
  },
};
