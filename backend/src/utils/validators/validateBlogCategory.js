const { body, param } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateBlogCategoryAdd = [
  body("blog_id")
    .notEmpty().withMessage("blog_id est requis").bail()
    .isInt({ min: 1 }).withMessage("blog_id invalide"),
  body("categorie_id")
    .notEmpty().withMessage("categorie_id est requis").bail()
    .isInt({ min: 1 }).withMessage("categorie_id invalide"),
  handleValidationErrors,
];

const validateBlogCategoryDestroy = [
  param("blogId")
    .isInt({ min: 1 }).withMessage("blogId invalide"),
  param("categoryId")
    .isInt({ min: 1 }).withMessage("categoryId invalide"),
  handleValidationErrors,
];

module.exports = { validateBlogCategoryAdd, validateBlogCategoryDestroy };
