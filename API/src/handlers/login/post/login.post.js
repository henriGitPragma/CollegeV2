// Import logger from external library
const pino = require('pino');

// Dans collegien.service, on trouve tous les services qu'on va appler ici  */
const { collegienLogin } = require('../../../services/collegien.service');

// Logger configuration
const logger = pino({
  prettyPrint: true,
});

/**
 * Post a new collegien
 *
 * @param req
 * @param res
 */

// Penser à mettre async /await
module.exports = async function loginCollegien(req, res) {
  logger.info('HANDLER loginCollegien');
   const loginCollegien =  collegienLogin(req, res);
  res.status(201);
};
