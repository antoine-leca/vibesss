const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const REPORT_REASONS = [
  "Harcèlement",
  "Spam / Publicité",
  "Spam",
  "Contenu inapproprié",
  "Droits d'auteur",
  "Plagiat",
  "Autre",
];

const REPORT_STATUSES = ["pending", "reviewed", "resolved"];

const validateReportAdd = [
  body("report_reason")
    .notEmpty().withMessage("Le motif du signalement est requis").bail()
    .isIn(REPORT_REASONS).withMessage("Motif de signalement invalide"),
  body("description")
    .notEmpty().withMessage("La description est requise").bail()
    .isString()
    .trim()
    .isLength({ max: 1000 }).withMessage("La description ne peut pas dépasser 1000 caractères"),
  body("user_id")
    .notEmpty().withMessage("user_id est requis").bail()
    .isInt({ min: 1 }).withMessage("user_id invalide"),
  body("article_id")
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage("article_id invalide"),
  body("blog_id")
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage("blog_id invalide"),
  body("comment_id")
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage("comment_id invalide"),
  handleValidationErrors,
];

const validateReportEdit = [
  param("id")
    .isInt({ min: 1 }).withMessage("ID signalement invalide"),
  body("status")
    .notEmpty().withMessage("Le statut est requis").bail()
    .isIn(REPORT_STATUSES).withMessage(`Statut invalide. Valeurs acceptées : ${REPORT_STATUSES.join(", ")}`),
  handleValidationErrors,
];

module.exports = { validateReportAdd, validateReportEdit };
