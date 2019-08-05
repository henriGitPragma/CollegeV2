module.exports = (key, service) => ((req, res, next) => {
  if (!req[key]) req[key] = service;
  else req.log.fatal(`Unable to bind service on ${key} - key already used`);
  next();
});
