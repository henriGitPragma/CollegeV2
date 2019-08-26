const mongoose = require('mongoose');
var crypto = require('crypto'); // npm install crypto --save-dev
var jwt = require('jsonwebtoken'); // npm install jsonwebtoken --save-dev

var CollegienSchema = new mongoose.Schema({
  nomEleve: {
    type: String,
    titlecase: true,
  },
  prenomEleve: {
    type: String,
    trim: true,
    titlecase: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  classeEleve: {
    type: String,
    trim: true,
    lowercase: true,

  },
  regimeEleve:  {
    type: String,
    trim: true,
    titlecase: true,
  },
date :[{
  h_Arr: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: new Date(),
  },
  h_Dep: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: new Date(),
  }
}],
  nomParent: {
    type: String,
    trim: true,
    lowercase: true,
  },
  prenomParent: {
    type: String,
    trim: true,
    lowercase: true,
  },
  qualiteParent: {
    type: String,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    trim: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: new Date(),
  },

  nomRole: {
    type: String,
    trim: true,
    lowercase: true,
  },

  hash: String,
  salt: String

}, { strict: false });


CollegienSchema.methods.setPassword = function(password){
  console.log('setPassword')
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

CollegienSchema.methods.validPassword = function(password) {
  console.log('validPassword')
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

// Ce que l'on met dans le token????
CollegienSchema.methods.generateJwt = function() {
  console.log('generateJWT')

  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  jot = jwt.sign({
    _id: this._id,
    nomEleve: this.nomEleve,
    prenomEleve: this.prenomEleve,
    nomRole: this.nomRole,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET");  // DO NOT KEEP YOUR SECRET IN THE CODE!

  console.log('jot', jot)
  return jot
};

mongoose.model('Collegien', CollegienSchema);
