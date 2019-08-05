
module.exports = {
  summary: 'FindAll a collegien',
  description: 'collegien FindAll',
  tags: ['collegien'],
  responses: {
    200: {
      description: 'Next questions',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Collegien',
            },
          },
        },
      },
    },
    default: {
      $ref: '#/components/responses/Error',
    },
  },
};
