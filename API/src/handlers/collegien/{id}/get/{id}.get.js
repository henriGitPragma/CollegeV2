// Import logger from external library
const pino = require('pino');
const { collegienFindById } = require('../../../../services/collegien.service');

// Logger configuration
const logger = pino({
  prettyPrint: true,
});

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async function getfindByIdCollegien(req, res) {
  logger.info('HANDLER getfindByIdCollegien');

  const paramsID = req.params.id;
  logger.info('Recovery ID', paramsID);

  const collegienFind = await collegienFindById(paramsID);
  logger.info('Collegien find : ', JSON.stringify(collegienFind, null, 2));

  res.status(200).json(collegienFind);
};
