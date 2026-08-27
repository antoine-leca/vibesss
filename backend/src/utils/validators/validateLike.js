const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateLike = [
  body("articleId")
    .notEmpty().withMessage("articleId est requis").bail()
    .isInt({ min: 1 }).withMessage("articleId invalide"),
  handleValidationErrors,
];

module.exports = { validateLike };
