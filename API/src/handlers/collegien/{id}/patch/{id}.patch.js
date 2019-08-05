// Import logger from external library
const pino = require('pino');
const { collegienFindByIdAndUpdate } = require('../../../../services/collegien.service');


// Logger configuration
const logger = pino({
  prettyPrint: true,
});

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = async function patchCollegien(req, res) {
  logger.info('HANDLER putCollegien');

  const paramsID = req.params.id;
  logger.info('Recovery ID', paramsID);

  const reqBody = req.body;
  logger.info('Recovery Body', reqBody);

  const updateCollegien = await collegienFindByIdAndUpdate(paramsID, reqBody);

  logger.info('Collegien update', JSON.stringify(updateCollegien, null, 2));

  res.status(201).json(updateCollegien);
};
