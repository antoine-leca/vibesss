const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateArticleAdd = [
  body("title")
    .notEmpty().withMessage("Le titre est requis").bail()
    .isString()
    .trim()
    .isLength({ max: 255 }).withMessage("Le titre ne peut pas dépasser 255 caractères"),
  body("blog_id")
    .notEmpty().withMessage("blog_id est requis").bail()
    .isInt({ min: 1 }).withMessage("blog_id invalide"),
  body("content_text")
    .optional()
    .isString(),
  handleValidationErrors,
];

const validateArticleEdit = [
  param("id")
    .isInt({ min: 1 }).withMessage("ID article invalide"),
  body("title")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 255 }).withMessage("Le titre ne peut pas dépasser 255 caractères"),
  body("content_text")
    .optional()
    .isString(),
  handleValidationErrors,
];

module.exports = { validateArticleAdd, validateArticleEdit };
