const { body } = require("express-validator");
const { validateEmail } = require("./validateEmail");
const handleValidationErrors = require("./handleValidationErrors");

const validateRegister = [
  body("email")
    .notEmpty().withMessage("L'email est requis").bail()
    .custom((val) => {
      if (!validateEmail(val)) throw new Error("Format d'email invalide");
      return true;
    }),
  body("pseudo")
    .notEmpty().withMessage("Le pseudo est requis").bail()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage("Le pseudo doit contenir entre 2 et 50 caractères"),
  body("password")
    .notEmpty().withMessage("Le mot de passe est requis"),
  body("firstname")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }).withMessage("Le prénom ne peut pas dépasser 100 caractères"),
  body("lastname")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 }).withMessage("Le nom ne peut pas dépasser 100 caractères"),
  handleValidationErrors,
];

const validateLogin = [
  body("email")
    .notEmpty().withMessage("L'email est requis").bail()
    .custom((val) => {
      if (!validateEmail(val)) throw new Error("Format d'email invalide");
      return true;
    }),
  body("password")
    .notEmpty().withMessage("Le mot de passe est requis"),
  handleValidationErrors,
];

module.exports = { validateRegister, validateLogin };
