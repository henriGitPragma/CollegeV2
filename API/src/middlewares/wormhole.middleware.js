/**
 * Catch all routes middleware
 * @param {Express.Request} req The request
 * @param {Express.Response} res The response
 * @param {Express.NextFunction} next The next middleware
 */
module.exports = function routeMiddleware(req, res, next) {
  if (!req.route && !/^\/assets/.test(req.originalUrl)) res.boom.notFound();
  else next();
};
