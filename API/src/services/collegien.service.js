const mongoose = require('mongoose');
const Collegien = mongoose.model('Collegien');
const passport = require('passport'); // npm install passport --save-dev

// Import logger from external library
const pino = require('pino');

// Logger configuration
const logger = pino({
  prettyPrint: true,
});

// ****************************************************************************************************
function collegienLogin(req, res) {
  console.log('1', req.body)

  passport.authenticate('local', function(err, user, info){
    console.log('2', user, info)

    var token;

    // If Passport throws/catches an error
    if (err) {
      console.log('8', user)

      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      console.log('9', user)

      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {

      console.log('10', user)

      // If user is not found
      res.status(401).json(info);
    }
  })(req,res);

};

// ****************************************************************************************************
// Recuperer le profil de la personne connecté
async function collegienProfile(req, res) {

  console.log('1', req.payload)

  if (!req.payload._id) {
    console.log('1',)
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Collegien
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
};
// ****************************************************************************************************
async function authGoogle(req) {
  logger.info('SERVICE authGoogle', req);
    const collegienCurrent = await Collegien.findOne({email : req});
    return {"token" : collegienCurrent.generateJwt()};
}

// **************************************************************************************************
// ****************************************************************************************************
async function collegienSave(req) {

  console.log('dans le service avec ', req)

  let collegien = await new Collegien(req);

  // **************************************************************************************************
// ****************************************************************************************************
// ***********************PENSER A DECOMMENTER POUR CRYPTER LES MDP************************************
// ****************************************************************************************************

  console.log('new collegien créée ', collegien.password)
  collegien.setPassword(req.password);
  console.log('password crypter ok?? ', collegien)

// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************


collegien.save(function(err) {
    var token;
    token = collegien.generateJwt();
  });

  return collegien
}

// **************************************************************************************************
function collegienFindById(id) {
  logger.info('SERVICE collegienFindById');
  return Collegien.findById(id);
}

// **************************************************************************************************
function collegienFindByIdAndDelete(id) {
  logger.info('SERVICE collegienFindByIdAndDelete');
  return Collegien.findByIdAndDelete(id);
}

// **************************************************************************************************
async function collegienFindByIdAndUpdate(id, update) {
  logger.info('SERVICE collegienFindByIdAndUpdate');

  const collegienByID = await collegienFindById(id);

  const collegienUpdate = Object.assign(collegienByID, update);

  const saveNewUpdate = await new Collegien(collegienUpdate);

  return saveNewUpdate.save();
}

// **************************************************************************************************
function collegienFindAllCritere(queryparams) {
  logger.info('SERVICE collegienFindAll ou ByCriteria', queryparams);

  // NomEleve
  const critereNom = queryparams.nomEleve;
  // eslint-disable-next-line prefer-template
  const regexNom = new RegExp('^' + critereNom, 'i');

  // PrenomEleve
  const criterePrenom = queryparams.prenomEleve;
  // eslint-disable-next-line prefer-template
  const regexPrenom = new RegExp('^' + criterePrenom, 'i');


  return Collegien.find({
    nomEleve: regexNom,
    prenomEleve: regexPrenom,
  }).select(queryparams.columnsOnly).sort({ nomEleve: 1 });
}

module.exports = {
  collegienSave,
  collegienFindById,
  collegienFindByIdAndDelete,
  collegienFindByIdAndUpdate,
  collegienFindAllCritere,
  collegienLogin,
  collegienProfile,
  authGoogle,
};
