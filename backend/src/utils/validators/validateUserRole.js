const { body } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateUserRoleAdd = [
  body("userId")
    .notEmpty().withMessage("userId est requis").bail()
    .isInt({ min: 1 }).withMessage("userId invalide"),
  body("roleId")
    .notEmpty().withMessage("roleId est requis").bail()
    .isInt({ min: 1 }).withMessage("roleId invalide"),
  handleValidationErrors,
];

module.exports = { validateUserRoleAdd };
