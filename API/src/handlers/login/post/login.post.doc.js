
module.exports = {
  summary: 'Create a collegien',
  description: 'collegien creation',
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
    201: {
      description: 'Next questions',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Collegien',
          },
        },
      },
    },
    default: {
      $ref: '#/components/responses/Error',
    },
  },
};
