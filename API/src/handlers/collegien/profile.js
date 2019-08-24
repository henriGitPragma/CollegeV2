const getProfileDoc = require('./profile/profile.get.doc');
const getProfile = require('./profile/profile.get');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


const operations = {
  GET: [ auth, getProfile],
};

operations.GET.apiDoc = getProfileDoc;

module.exports = operations;
