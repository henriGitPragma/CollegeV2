const dotenv = require('dotenv');
const merge = require('./utils/merge.utils');

const defaults = {
  production: false,
  root: '/api',
  port: 3000,
  cors: {
    // Check cors doc for options - v4
    // https://www.npmjs.com/package/cors#configuration-options
  },
  mongo: {
    uri: 'mongodb://localhost:27017/meteole',
    opts: {
      autoReconnect: true,
      reconnectTries: 10,
      reconnectInterval: 1000,
      poolSize: 20,
    },
  },
  log: 'debug',
};

dotenv.config();
const config = merge(defaults, 'EOLE_');
Object.assign(defaults, config);

module.exports = defaults;
