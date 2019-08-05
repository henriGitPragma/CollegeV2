// Import logger from external library
const pino = require('pino');

const { collegienFindByIdAndDelete } = require('../../../../services/collegien.service');

// Logger configuration
const logger = pino({
  prettyPrint: true,
});

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async function deleteByIdCollegien(req, res) {
  logger.info('HANDLER deleteByIdCollegien');

  // Recuperation de l'ID
  const paramsID = req.params.id;
  logger.info('Recovering ID', paramsID);

  // Appel de la fonction findByIdAndDelete
  const deleteByID = await collegienFindByIdAndDelete(paramsID);
  logger.info('Collegien delete : ', deleteByID);

  res.status(204).send();
};
