// Import logger from external library
const pino = require('pino');

// Dans collegien.service, on trouve tous les services qu'on va appler ici  */
const { collegienSave } = require('../../../services/collegien.service');

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
module.exports = async function saveCollegien(req, res) {
  logger.info('HANDLER saveCollegien');

  const reqBody = req.body;
  logger.info('Body find : ', reqBody);

  const newCollegien = await collegienSave(reqBody);
  logger.info('Collegien create : ', JSON.stringify(newCollegien, null, 2));

  res.status(201).json(newCollegien);
};
