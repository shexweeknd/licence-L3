const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers.js");

// --------------validation des types de donnnées-------------
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
});

const LoginSchema = Joi.object({
  password: Joi.string().min(8).max(16).required(),
  email: Joi.string().email().required(),
});

//------------------------------------------------------------

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(LoginSchema),
  authControllers.controllers.postLogin
);

module.exports = router;
