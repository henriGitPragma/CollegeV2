
module.exports = {
  summary: 'FindByID a collegien',
  description: 'collegien FindByID',
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
    200: {
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
