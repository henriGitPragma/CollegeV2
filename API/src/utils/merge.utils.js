const camel = require('camelcase');

/**
 * Cast the value
 * @param {string} value Value
 * @returns {string|boolean|number} The casted value
 */
function parseValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  const float = parseFloat(value);
  if (Number.isFinite(float) && String(float) === value) return float;
  return value;
}

/**
 * Merge environment variables starting by {prefix} with the config object
 * @param {any} config Configuration object
 * @param {string} [prefix] Variable prefix (default: APP_)
 */
module.exports = function mergeConfig(config, prefix = 'APP_') {
  const result = JSON.parse(JSON.stringify(config));
  const envKeys = Object.keys(process.env);
  envKeys.forEach((envKey) => {
    if (!envKey.startsWith(prefix)) return;

    // Split key
    const path = envKey
      .replace(new RegExp(`^${prefix}`), '')
      .split('__')
      .filter(segment => segment)
      .map(segment => camel(segment));

    // Traverse config object
    let configOpt = result;
    for (let i = 0; i < path.length - 1; i += 1) {
      const key = path[i];
      if (typeof configOpt[key] !== 'object') return;
      configOpt = configOpt[key];
    }

    // Set the property if it exists
    const lastKey = path[path.length - 1];
    if (configOpt[lastKey] !== undefined) configOpt[lastKey] = parseValue(process.env[envKey]);
  });

  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-param-reassign
    result.production = true;
  }
  return result;
};

module.exports.parseValue = parseValue;
