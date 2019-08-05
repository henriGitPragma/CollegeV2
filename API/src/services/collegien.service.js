const mongoose = require('mongoose');

const Collegien = mongoose.model('collegien');

// Import logger from external library
const pino = require('pino');

// Logger configuration
const logger = pino({
  prettyPrint: true,
});

async function collegienSave(reqdata) {
  logger.info('SERVICE collegienSave', reqdata);
  const collegien = await new Collegien(reqdata);
  return collegien.save();
}


function collegienFindById(id) {
  logger.info('SERVICE collegienFindById');
  return Collegien.findById(id);
}


function collegienFindByIdAndDelete(id) {
  logger.info('SERVICE collegienFindByIdAndDelete');
  return Collegien.findByIdAndDelete(id);
}


async function collegienFindByIdAndUpdate(id, update) {
  logger.info('SERVICE collegienFindByIdAndUpdate');

  const collegienByID = await collegienFindById(id);

  const collegienUpdate = Object.assign(collegienByID, update);

  const saveNewUpdate = await new Collegien(collegienUpdate);

  return saveNewUpdate.save();
}


function collegienFindAllCritere(queryparams) {
  logger.info('SERVICE collegienFindAll ou ByCriteria', queryparams);

  // NomEleve
  const critereNom = queryparams.nomEleve;
  // eslint-disable-next-line prefer-template
  const regexNom = new RegExp('^' + critereNom, 'i');

  // Prenom
  const criterePrenom = queryparams.prenomEleve;
  // eslint-disable-next-line prefer-template
  const regexPrenom = new RegExp('^' + criterePrenom, 'i');

  // Ville
  const critereClasse = queryparams.classeEleve;
  // eslint-disable-next-line prefer-template
  const regexClasse = new RegExp('^' + critereClasse, 'i');

  return Collegien.find({
    nomEleve: regexNom, prenomEleve: regexPrenom, classeEleve: regexClasse,
  }).sort({ nom: 1 });
}


module.exports = {
  collegienSave,
  collegienFindById,
  collegienFindByIdAndDelete,
  collegienFindByIdAndUpdate,
  collegienFindAllCritere,
};
