const { boomify } = require('boom');

/**
 * Middleware that catches errors and respond to the client with the right code
 * @param {Error} err The error that occured
 * @param {Express.Request} req The request
 * @param {Express.Response} res The response
 * @param {Express.NextFunction} next The next middleware
 */
// eslint-disable-next-line no-unused-vars
module.exports = function errorMiddleware(err, req, res, next) {
  if (err instanceof Error) {
    const boom = boomify(err);
    switch (err.name) {
      case 'UnauthorizedError': // JWT validation
        res.boom.unauthorized(boom.message);
        break;
      case 'MimeError':
        res.boom.unsupportedMediaType(boom.message);
        break;
      case 'ValidationError': // Joi assertion
        res.boom.badRequest(boom.message);
        break;
      default: // Unknown
        res.boom.internal(boom.message);
        req.log.error('An error occurred');
        req.log.error({
          error: {
            err,
            message: err ? err.message : undefined,
            stack: err ? err.stack : undefined,
          },
        });
    }
  } else if (err.status) { // Express-Openapi error
    let message = 'An error occurred';
    if (err.status === 400) {
      if (Array.isArray(err.errors)) {
        message = err.errors.map(e => `Invalid ${e.location}: ${e.path} ${e.message}`).join();
      }
    } else {
      req.log.error('An unexpected error occurred');
      req.log.error({
        error: {
          err,
          message: err ? err.message : undefined,
          stack: err ? err.stack : undefined,
        },
      });
    }
    res.boom.boomify(new Error(message), { statusCode: err.status });
  } else { // Unknown error
    res.boom.internal();
    req.log.error('An error occurred');
    req.log.error({
      error: {
        err,
        message: err ? err.message : undefined,
        stack: err ? err.stack : undefined,
      },
    });
  }
};
