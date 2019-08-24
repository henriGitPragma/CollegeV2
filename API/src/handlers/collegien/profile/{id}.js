const getIDAuth = require('./{id}/get/eolien.get');
const getIdDocAuth = require('./{id}/get/eolien.get.doc');


const operations = {
  GET: [getIDAuth],

};

operations.GET.apiDoc = getIdDocAuth;



module.exports = operations;
