// Import logger from external library
const pino = require('pino');
const { collegienProfile } = require('../../../services/collegien.service');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

// Logger configuration
const logger = pino({
  prettyPrint: true,
});

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async function CurrentCollegien(req, res) {
  logger.info('HANDLER CurrentCollegien', req.payload);

  const profileCurrent = await collegienProfile(req, res);
  logger.info('Collegien find : ', JSON.stringify(profileCurrent, null, 2));

  res.status(200);
};
