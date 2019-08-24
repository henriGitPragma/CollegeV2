
const postDocAuth = require('./login/post/login.post.doc');
const postAuth = require('./login/post/login.post');


const operations = {
  POST: [postAuth],
};

operations.POST.apiDoc = postDocAuth;

module.exports = operations;
