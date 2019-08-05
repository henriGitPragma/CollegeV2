const mongoose = require('mongoose');

const CollegienSchema = require('./collegien.schema');

module.exports = () => {
  mongoose.model('collegien', CollegienSchema);
};
