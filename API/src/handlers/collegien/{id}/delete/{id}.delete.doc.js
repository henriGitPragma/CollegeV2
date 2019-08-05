
module.exports = {
  summary: 'DeleteByID a collegien',
  description: 'collegien DeleteByID',
  tags: ['collegien'],
  requestBody: {
    description: 'Answers to previous questions',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Collegien',
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Next questions',
    },
    default: {
      $ref: '#/components/responses/Error',
    },
  },
};
