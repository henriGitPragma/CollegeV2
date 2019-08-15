const { Schema } = require('mongoose');

module.exports = new Schema({
  nomEleve: {
    type: String,
    titlecase: true,
  },
  prenomEleve: {
    type: String,
    trim: true,
    titlecase: true,
  },
  mailEleve: {
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

  h_Arr: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: new Date(),
  },
  h_Dep: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: new Date(),
  },
  nomParent: {
    type: String,
    trim: true,
    lowercase: true,
  },
  domaine: {
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
  password: {
    type: String,
    trim: true,
  },
  passwordConfirme: {
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

}, { strict: false });
