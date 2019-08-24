
module.exports = {
  summary: 'FindByID a collegien',
  description: 'collegien FindByID',
  tags: ['collegien'],
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
