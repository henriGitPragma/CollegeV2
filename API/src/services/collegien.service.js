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

  // Nom
  const critereNom = queryparams.nom;
  // eslint-disable-next-line prefer-template
  const regexNom = new RegExp('^' + critereNom, 'i');

  // Prenom
  const criterePrenom = queryparams.prenom;
  // eslint-disable-next-line prefer-template
  const regexPrenom = new RegExp('^' + criterePrenom, 'i');

  // Ville
  const critereVille = queryparams.ville;
  // eslint-disable-next-line prefer-template
  const regexVille = new RegExp('^' + critereVille, 'i');

  // Parrain
  const critereParrain = queryparams.trigrammeParrain;
  // eslint-disable-next-line prefer-template
  const regexParrain = new RegExp('^' + critereParrain, 'i');

  // Parrain
  const critereCouleur = queryparams.indiceCouleurSynthese;
  // eslint-disable-next-line prefer-template
  const regexCouleur = new RegExp('^' + critereCouleur, 'i');

  return Collegien.find({
    nom: regexNom, prenom: regexPrenom, ville: regexVille, trigrammeParrain: regexParrain, indiceCouleurSynthese: regexCouleur,
  }).sort({ nom: 1 });
}


module.exports = {
  collegienSave,
  collegienFindById,
  collegienFindByIdAndDelete,
  collegienFindByIdAndUpdate,
  collegienFindAllCritere,
};
