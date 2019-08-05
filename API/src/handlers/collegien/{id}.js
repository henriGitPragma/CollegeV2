const getID = require('./{id}/get/{id}.get');
const getIdDoc = require('./{id}/get/{id}.get.doc');

const deleteID = require('./{id}/delete/{id}.delete');
const deleteIdDoc = require('./{id}/delete/{id}.delete.doc');

const patchID = require('./{id}/patch/{id}.patch');
const patchIDdoc = require('./{id}/patch/{id}.patch.doc');

const operations = {
  GET: [getID],
  DELETE: [deleteID],
  PATCH: [patchID],
};

operations.GET.apiDoc = getIdDoc;

operations.DELETE.apiDoc = deleteIdDoc;

operations.PATCH.apiDoc = patchIDdoc;

module.exports = operations;
