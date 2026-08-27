const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const NOTIF_TYPES = ["like", "comment"];

const validateNotificationAdd = [
  body("notif_type")
    .notEmpty().withMessage("notif_type est requis").bail()
    .isIn(NOTIF_TYPES).withMessage(`Type de notification invalide. Valeurs acceptées : ${NOTIF_TYPES.join(", ")}`),
  body("user_id")
    .notEmpty().withMessage("user_id est requis").bail()
    .isInt({ min: 1 }).withMessage("user_id invalide"),
  body("sender_id")
    .notEmpty().withMessage("sender_id est requis").bail()
    .isInt({ min: 1 }).withMessage("sender_id invalide"),
  body("article_id")
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage("article_id invalide"),
  body("comment_id")
    .optional({ nullable: true })
    .isInt({ min: 1 }).withMessage("comment_id invalide"),
  handleValidationErrors,
];

const validateNotificationId = [
  param("id")
    .isInt({ min: 1 }).withMessage("ID notification invalide"),
  handleValidationErrors,
];

const validateNotificationUserId = [
  param("userId")
    .isInt({ min: 1 }).withMessage("userId invalide"),
  handleValidationErrors,
];

module.exports = { validateNotificationAdd, validateNotificationId, validateNotificationUserId };
