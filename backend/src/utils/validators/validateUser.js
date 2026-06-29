const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateUserEdit = [
  param("id")
    .isInt({ min: 1 }).withMessage("ID utilisateur invalide"),
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
  body("bio")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 }).withMessage("La bio ne peut pas dépasser 500 caractères"),
  handleValidationErrors,
];

module.exports = { validateUserEdit };