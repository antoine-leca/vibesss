const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateBlogAdd = [
  body("title")
    .notEmpty().withMessage("Le titre est requis").bail()
    .isString()
    .trim()
    .isLength({ max: 255 }).withMessage("Le titre ne peut pas dépasser 255 caractères"),
  body("user_id")
    .notEmpty().withMessage("user_id est requis").bail()
    .isInt({ min: 1 }).withMessage("user_id invalide"),
  body("description")
    .optional()
    .isString()
    .trim(),
  body("theme_id")
    .optional()
    .isInt({ min: 1 }).withMessage("theme_id invalide"),
  handleValidationErrors,
];

const validateBlogEdit = [
  param("id")
    .isInt({ min: 1 }).withMessage("ID blog invalide"),
  body("title")
    .notEmpty().withMessage("Le titre est requis").bail()
    .isString()
    .trim()
    .isLength({ max: 255 }).withMessage("Le titre ne peut pas dépasser 255 caractères"),
  body("description")
    .optional()
    .isString()
    .trim(),
  body("theme_id")
    .optional()
    .isInt({ min: 1 }).withMessage("theme_id invalide"),
  body("banniere")
    .optional()
    .isString(),
  body("couleurs")
    .optional()
    .isString(),
  handleValidationErrors,
];

module.exports = { validateBlogAdd, validateBlogEdit };
