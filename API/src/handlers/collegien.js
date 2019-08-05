
const postDoc = require('./collegien/post/collegien.post.doc');
const postCollegien = require('./collegien/post/collegien.post');

const getDoc = require('./collegien/get/collegien.get.doc');
const getAll = require('./collegien/get/collegien.get');

const operations = {
  POST: [postCollegien],
  GET: [getAll],
};

operations.POST.apiDoc = postDoc;

operations.GET.apiDoc = getDoc;

module.exports = operations;
