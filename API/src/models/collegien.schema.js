const { Schema } = require('mongoose');

module.exports = new Schema({
  trigramme: {
    type: String,
    uppercase: true,
  },
  nom: {
    type: String,
    trim: true,
    lowercase: true,
  },
  prenom: {
    type: String,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
  },
  mobile: String,
  dateEntree: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: new Date(),
  },
  position: Number,
  coefficient: Number,
  salaire: Number,
  libPoste: {
    type: String,
    trim: true,
  },
  domaine: {
    type: String,
    trim: true,
    lowercase: true,
  },
  ville: {
    type: String,
    trim: true,
    lowercase: true,
  },
  isMission: {
    type: Boolean,
    default: false,
  },
  libMission: {
    type: String,
    trim: true,
  },
  nomCommercial: {
    type: String,
    trim: true,
    lowercase: true,
  },
  trigrammeParrain: {
    type: String,
    trim: true,
    uppercase: true,
  },
  dateMeteole: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now,
  },
  isAccompagnementRh: {
    type: Boolean,
    default: false,
  },
  isReconnaissance: {
    type: Boolean,
    default: false,
  },
  isAppartenance: {
    type: Boolean,
    default: false,
  },
  isProjetProfessionnel: {
    type: Boolean,
    default: false,
  },
  indiceCouleurSynthese: {
    type: String,
    default: '#ffffff',
  },
  situation: {
    type: String,
    trim: true,
    lowercase: true,
  },
  planActionParrain: {
    type: String,
    trim: true,
  },
  decisionSeance: {
    type: String,
    trim: true,
  },
  isParrain: {
    type: Boolean,
    default: false,
  },
  isParticipationMeteole: {
    type: Boolean,
    default: false,
  },
  isArchive: {
    type: Boolean,
    default: false,
  },
  nomRole: {
    type: String,
    trim: true,
    lowercase: true,
  },
  tauxCollecte: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    trim: true,
  },
  isSpeakAboutMe: {
    type: Boolean,
    default: false,
  },
  login: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    lowercase: true,
  },
  isValidateMeteole: {
    type: Boolean,
    default: false,
  },

}, { strict: false });
