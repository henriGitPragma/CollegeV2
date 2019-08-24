// Import logger from external library
const pino = require('pino');
//* * Dans collegien.service, on trouve tous les services qu'on va appler ici  */
const { authGoogle } = require('../../../../../services/collegien.service');

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
module.exports = async function getAuthGoogle(req, res) {
  const params = req.params.id;
/*   console.log('params',params)
 */
    const user = await authGoogle(params);
/*     console.log('test', JSON.stringify(user, null, 2))
 */
    res.status(200).json(user)
};
