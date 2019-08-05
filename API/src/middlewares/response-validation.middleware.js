/**
 * Middleware that validates responses before sending them
 * @param {Express.Request} req The request
 * @param {Express.Response} res The response
 * @param {Express.NextFunction} next The next middleware
 */
// eslint-disable-next-line no-unused-vars
module.exports = function responseValidationMiddleware(req, res, next) {
  const strictValidation = !!req.apiDoc['x-express-openapi-validation-strict'];
  if (typeof res.validateResponse === 'function') {
    const { send } = res;
    res.send = (...args) => {
      const onlyWarn = !strictValidation;
      // Do not loop (onlyWarn mode) and send the reply anyway
      if (res.get('x-express-openapi-validation-error-for') !== undefined) {
        return send.apply(res, args);
      }

      let body;
      if (res.getHeader('content-type')
          && res.getHeader('content-type').indexOf('application/json') !== -1
          && typeof args[0] === 'string') {
        body = JSON.parse(args[0]);
      } else {
        [body] = args;
      }
      let validation = res.validateResponse(res.statusCode, body);
      if (validation === undefined) {
        validation = {
          message: undefined,
          errors: undefined,
        };
      }

      if (validation.errors) {
        const errorList = Array.from(validation.errors).map(_ => _.message).join(',');
        const validationMessage = `Invalid response for status code ${res.statusCode}: ${errorList}`;
        // Set to avoid a loop, and to provide the original status code
        res.set('x-express-openapi-validation-error-for', res.statusCode.toString());


        if (onlyWarn) { // Warn then continue
          req.log.warn(validationMessage);
        } else { // Fatal then send 500
          req.log.fatal(validationMessage);
          return res.boom.internal(null, { message: validationMessage });
        }
      }

      return send.apply(res, args);
    };
  }
  next();
};
