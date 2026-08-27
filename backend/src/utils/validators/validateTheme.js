const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateThemeAdd = [
  body("label")
    .notEmpty().withMessage("Le label est requis")
    .isString()
    .trim()
    .isLength({ max: 100 }).withMessage("Le label ne peut pas dépasser 100 caractères"),
  body("color_name")
    .optional()
    .isString()
    .trim(),
  body("font_name")
    .optional()
    .isString()
    .trim(),
  body("bg_image")
    .optional()
    .isString(),
  handleValidationErrors,
];

module.exports = { validateThemeAdd };
