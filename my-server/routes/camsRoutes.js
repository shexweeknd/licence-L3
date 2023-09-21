const express = require("express");
const router = express.Router();
const camsListControllers = require('../controllers/cams/camsListControllers.js');
const auth = require("../middleware/auth.js");

// --------------validation des types de donnnées-------------
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

// schema pour les appareils caméras voulant s'inscrire dans la liste des caméras connectés
const postCamsListSchema = Joi.object({
  salle: Joi.string().required(),
  // ip: Joi.string().regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/).required(),
  // src: Joi.array(),
  // type: Joi.string().required(),
  key: Joi.string().required()
});

//------------------------------------------------------------

// routes protégées des api pour les utilisateurs voulant obtenir les informations concernants les caméra
router.get(
  "/getcams",
  // auth,
  camsListControllers.controllers.queryListOfCams
)

router.post(
  "/nom-de-salle",
  camsListControllers.controllers.querySalleName
)

// api pour les appareils des caméras, pas besoin d'authentfier les caméras pour l'instant 
router.post(
  "/integrate",
  validator.body(postCamsListSchema),
  camsListControllers.controllers.integrate
);

module.exports = router;