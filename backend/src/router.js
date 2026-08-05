const express = require("express");
const router = express.Router();

// ------------ IMPORTS CONTROLLERS
const userController = require("./controllers/userController");
const reportController = require("./controllers/reportController");
const notifController = require("./controllers/notifController");
const articleController = require("./controllers/articleController");
const userReportController = require("./controllers/userReportController");
const commentController = require("./controllers/commentController");
const blogController = require("./controllers/blogController");
const blogCategoryController = require("./controllers/blogCategoryController");
const userLikeArticleController = require("./controllers/userLikeArticleController");
const themeController = require("./controllers/themeController");
const roleController = require("./controllers/roleController");

// ------------ IMPORTS SERVICES / AUTH
const {
    hashPassword,
    verifyPassword,
    verifyToken,
    verifyAdmin,
    logout
} = require("./auth");

// ------------ IMPORTS VALIDATORS
const { validateRegister, validateLogin } = require("./utils/validators/validateAuth");
const { validateUserEdit } = require("./utils/validators/validateUser");
const { validateArticleAdd, validateArticleEdit } = require("./utils/validators/validateArticle");
const { validateCommentAdd, validateCommentEdit } = require("./utils/validators/validateComment");
const { validateBlogAdd, validateBlogEdit } = require("./utils/validators/validateBlog");
const { validateBlogCategoryAdd, validateBlogCategoryDestroy } = require("./utils/validators/validateBlogCategory");
const { validateReportAdd, validateReportEdit } = require("./utils/validators/validateReport");
const { validateNotificationAdd, validateNotificationId, validateNotificationUserId } = require("./utils/validators/validateNotification");
const { validateLike } = require("./utils/validators/validateLike");
const { validateThemeAdd } = require("./utils/validators/validateTheme");

// =========================================================================
// ------------- ROUTES PUBLIQUES (ACCESSIBLES SANS TOKEN) -------------
// =========================================================================

// Auth & Profil de base
router.post("/auth/register", ...validateRegister, userController.validatePassword, userController.checkEmailAvailability, userController.getUserByPseudo, hashPassword, userController.add);
router.post("/auth/login", ...validateLogin, userController.getUserByEmail, verifyPassword);
router.get("/auth/logout", logout);

// Users (Lecture publique)
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);

// Blogs (Lecture publique)
router.get("/blogs", blogController.browse);
router.get("/blogs/:id", blogController.read);
router.get("/blogs/user/:id", blogController.getByUserId);

// Articles (Lecture publique)
router.get("/articles", articleController.browse);
router.get("/articles/:id", articleController.read);
router.get("/blogs/:blogId/articles", articleController.browseByBlog);

// Comments (Lecture publique)
router.get("/comments", commentController.browse);
router.get("/comments/:id", commentController.read);
router.get("/articles/:articleId/comments", commentController.readByArticle);

// Themes & Categories (Lecture publique)
router.get("/themes", themeController.browse);
router.get("/blogs_categories", blogCategoryController.browse);
router.get("/blogs_categories/blog/:blogId", blogCategoryController.findByBlogId);
router.get("/roles", roleController.browse);

// Reports (Lecture/Création publique pour tests)
router.get("/reports", reportController.browse);
router.post("/reports", ...validateReportAdd, reportController.add);
router.put("/reports/:id", ...validateReportEdit, reportController.edit);
router.delete("/reports/:id", reportController.destroy);


// =========================================================================
// ------------- MIDDLEWARE D'AUTHENTIFICATION (LE VIDEUR) -------------
// =========================================================================
router.use(verifyToken);


// =========================================================================
// ------------- ROUTES PROTÉGÉES (CONNEXION OBLIGATOIRE) -------------
// =========================================================================

// Users Actions
router.patch("/users/:id", ...validateUserEdit, userController.edit);
router.post("/users/email", userController.getUserByEmail);
router.post("/users/pseudo", userController.getUserByPseudo);
router.delete("/users/:id", userController.destroy);

// Notifications Private Data
router.get("/notifications", notifController.browse);
router.get("/notifications/unread/:userId", ...validateNotificationUserId, notifController.getUnread);
router.get("/notifications/user/:userId", ...validateNotificationUserId, notifController.getByUser);
router.post("/notifications", ...validateNotificationAdd, notifController.add);
router.put("/notifications/:id", ...validateNotificationId, notifController.markAsRead);
router.delete("/notifications/:id", ...validateNotificationId, notifController.destroy);

// Articles Actions (Écriture)
router.post("/articles", ...validateArticleAdd, articleController.add);
router.put("/articles/:id", ...validateArticleEdit, articleController.edit);
router.delete("/articles/:id", articleController.destroy);
router.delete("/articles/user/:userId", articleController.destroyAllbyUser);

// Comments Actions (Écriture)
router.post("/comments", ...validateCommentAdd, commentController.add);
router.put("/comments/:id", ...validateCommentEdit, commentController.edit);
router.delete("/comments/:id", commentController.destroy);

// Blogs Actions (Écriture)
router.post("/blogs", ...validateBlogAdd, blogController.add);
router.put("/blogs/:id", ...validateBlogEdit, blogController.edit);
router.delete("/blogs/:id", blogController.destroy);

// Blogs Categories Actions
router.post("/blogs_categories", ...validateBlogCategoryAdd, blogCategoryController.add);
router.delete("/blogs_categories/:blogId/:categoryId", ...validateBlogCategoryDestroy, blogCategoryController.destroy);

// Likes Actions
router.post("/users_articles", ...validateLike, userLikeArticleController.add);
router.delete("/users_articles", ...validateLike, userLikeArticleController.destroy);

// Themes Actions
router.post("/themes", ...validateThemeAdd, themeController.add);


// =========================================================================
// ------------- ROUTES STRICTEMENT ADMINISTRATEUR (role_id = 2) -------------
// =========================================================================

// Stats & Activités du tableau de bord Admin
router.get("/admin/stats", verifyAdmin, userController.getStats);
router.get("/admin/activities", verifyAdmin, userController.getActivities);

// Gestion des rôles utilisateurs (RBAC)
router.patch("/admin/users/:id/role", verifyAdmin, userController.editRole);

module.exports = router;