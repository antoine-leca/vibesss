const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateCommentAdd = [
  body("content")
    .notEmpty().withMessage("Le contenu est requis").bail()
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 }).withMessage("Le commentaire doit contenir entre 1 et 2000 caractères"),
  body("article_id")
    .notEmpty().withMessage("article_id est requis").bail()
    .isInt({ min: 1 }).withMessage("article_id invalide"),
  body("user_id")
    .notEmpty().withMessage("user_id est requis").bail()
    .isInt({ min: 1 }).withMessage("user_id invalide"),
  handleValidationErrors,
];

const validateCommentEdit = [
  param("id")
    .isInt({ min: 1 }).withMessage("ID commentaire invalide"),
  body("content")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 }).withMessage("Le commentaire doit contenir entre 1 et 2000 caractères"),
  body("moderation_status")
    .optional()
    .isIn(["pending", "approved", "rejected"]).withMessage("Statut de modération invalide"),
  handleValidationErrors,
];

module.exports = { validateCommentAdd, validateCommentEdit };
