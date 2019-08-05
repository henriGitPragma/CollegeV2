module.exports = {
  type: 'object',
  description: 'A collegien',
  properties: {
    trigramme: {
      type: 'string',
      description: 'Collegien Trigramme : Premiere lettre du Prenom et deux premieres du Nom',
      example: 'FLA',
    },
    nom: {
      type: 'string',
      description: 'Collegien name',
      example: 'Fabrice',
    },
    prenom: {
      type: 'string',
      description: 'Collegien surname',
      example: 'Labrouche',
    },
    email: {
      type: 'string',
      description: 'Collegien email',
      example: 'fabrice.labrouche@eole-consutling.fr',
    },
    mobile: {
      type: 'string',
      description: 'Collegien mobile',
      example: '06 25 25 25 25 25',
    },
    dateEntree: {
      type: Date,
      description: 'Collegien first Date',
      example: '2019-07-181T17:32:28Z',
    },
    position: {
      type: Number,
      description: ' ',
      example: 3,
    },
    coefficient: {
      type: Number,
      description: ' ',
      example: 350,
    },
    salaire: {
      type: Number,
      description: ' ',
      example: 2000.00,
    },
    libPoste: {
      type: 'string',
      description: 'Collegien libelle du poste',
      example: 'Developpeur',
    },
    domaine: {
      type: 'string',
      description: 'Collegien domaine',
      example: 'Eolab',
    },
    ville: {
      type: 'string',
      description: 'Collegien city',
      example: 'Toulouse',
    },
    isMission: {
      type: 'boolean',
      description: 'Collegien IS Mission',
      example: false,
    },
    libMission: {
      type: 'string',
      description: 'Collegien name mission',
      example: 'Is mission from Airbus',
    },
    nomCommercial: {
      type: 'string',
      description: 'Commercial name',
      example: 'Fabrice Com',
    },
    trigrammeParrain: {
      type: 'string',
      description: 'Trigramme Parrain',
      example: 'FLA',
    },
    dateMeteole: {
      type: Date,
      description: 'Collegien date of the month',
      example: '2019-07-181T17:32:28Z',
    },
    isAccompagnementRh: {
      type: 'boolean',
      description: 'Collegien IS Accompagenement by RH',
      example: false,
    },
    isReconnaissance: {
      type: 'boolean',
      description: 'Collegien IS Reconnaisssance',
      example: false,
    },
    isAppartenance: {
      type: 'boolean',
      description: 'Collegien IS Appartenance',
      example: false,
    },
    isProjetProfessionnel: {
      type: 'boolean',
      description: 'Collegien IS projet Professional',
      example: false,
    },
    indiceCouleurSynthese: {
      type: 'string',
      description: 'Collegien color',
      example: 'Blanc - B, Rouge - R, Orange-  O, Vert - V, Noir - N',
    },
    situation: {
      type: 'string',
      description: 'Collegien sitution',
      example: ' ',
    },
    planActionParrain: {
      type: 'string',
      description: 'Collegien Action by Parrain',
      example: '',
    },
    decisionSeance: {
      type: 'string',
      description: 'Collegien decision by RH',
      example: '',
    },
    isParrain: {
      type: 'boolean',
      description: 'Collegien IS parrain',
      example: false,
    },
    isParticipationMeteole: {
      type: 'boolean',
      description: 'Parrain IS participation at the meeting',
      example: false,
    },
    isArchive: {
      type: 'boolean',
      description: 'Collegien IS archive',
      example: false,
    },
    nomRole: {
      type: 'string',
      description: 'Collegien Role',
      example: 'Super-Admin, Admin, Parrains/Marraines, Aucun',
    },
    tauxCollecte: {
      type: 'number',
      description: ' KPI collecte',
      example: 0.60,
    },
    password: {
      type: 'string',
      description: 'Collegien password',
      example: 'xxxxxxx',
    },
    isSpeakAboutMe: {
      type: 'boolean',
      description: 'Collegien IS speak about me',
      example: false,
    },
    login: {
      type: 'string',
      description: 'Collegien login',
      example: 'e-mail',
    },
    status: {
      type: 'string',
      description: 'Collegien status',
      example: 'Direction / Responsable de domaine / Parrain / STAFF',
    },
    isValidateMeteole: {
      type: 'boolean',
      description: 'Parrain IS validate meteole',
      example: false,
    },
  },
};
