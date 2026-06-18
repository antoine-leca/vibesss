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
const userRoleController = require("./controllers/userRoleController");

const {
    hashPassword,
    verifyPassword,
    verifyToken,
    logout
} = require("./auth");

// =========================================================================
// ------------- ROUTES PUBLIQUES (ACCESSIBLES SANS TOKEN) -------------
// =========================================================================

// Auth & Profil de base
router.post("/auth/register", userController.validatePassword, userController.checkEmailAvailability, userController.getUserByPseudo, hashPassword, userController.add);
router.post("/auth/login", userController.getUserByEmail, verifyPassword);
router.get("/auth/logout", logout);

// Users (Lecture publique)
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);

// Blogs (Lecture publique) 
router.get("/blogs", blogController.browse);
router.get("/blogs/:id", blogController.read);
router.get("/blogs/user/:id", blogController.getByUserId); // Nécessaire pour l'initialisation du container

// Articles (Lecture publique) 
router.get("/articles", articleController.browse);
router.get("/articles/:id", articleController.read);
router.get("/blogs/:blogId/articles", articleController.browseByBlog);

// Comments (Lecture publique)
router.get("/comments", commentController.browse);
router.get("/comments/:id", commentController.read);
router.get("/articles/:articleId/comments", commentController.readByArticle);

// Themes & Categories (Lecture publique pour l'éditeur)
router.get("/themes", themeController.browse);
router.get("/blogs_categories", blogCategoryController.browse);
router.get("/blogs_categories/blog/:blogId", blogCategoryController.findByBlogId);
router.get("/roles", roleController.browse);

// Reports (Public pour tes tests actuels)
router.get("/reports", reportController.browse);
router.post("/reports", reportController.add);
router.put("/reports/:id", reportController.edit);
router.delete("/reports/:id", reportController.destroy);

// Stats & Activities Admin (À protéger plus tard si besoin)
router.get("/admin/stats", userController.getStats);
router.get("/admin/activities", userController.getActivities);


// =========================================================================
// ------------- MIDDLEWARE D'AUTHENTIFICATION (LE VIDEUR) -------------
// =========================================================================
router.use(verifyToken);


// =========================================================================
// ------------- ROUTES PROTÉGÉES (CONNEXION OBLIGATOIRE) -------------
// =========================================================================

router.use(verifyToken); // Toutes les routes ci-dessous nécessitent un token

// Users Actions
router.patch("/users/:id", userController.edit);
router.post("/users/email", userController.getUserByEmail);
router.post("/users/pseudo", userController.getUserByPseudo);
router.delete("/users/:id", userController.destroy);

// Notifications Private Data
router.get("/notifications", notifController.browse);
router.get("/notifications/unread/:userId", notifController.getUnread);
router.get("/notifications/user/:userId", notifController.getByUser);
router.post("/notifications", notifController.add);
router.put("/notifications/:id", notifController.markAsRead);
router.delete("/notifications/:id", notifController.destroy);

// Articles Actions (Écriture)
router.post("/articles", articleController.add);
router.put("/articles/:id", articleController.edit);
router.delete("/articles/:id", articleController.destroy);
router.delete("/articles/user/:userId", articleController.destroyAllbyUser);

// Comments Actions (Écriture)
router.post("/comments", commentController.add);
router.put("/comments/:id", commentController.edit);
router.delete("/comments/:id", commentController.destroy);

// Blogs Actions (Écriture)
router.post("/blogs", blogController.add);
router.put("/blogs/:id", blogController.edit);
router.delete("/blogs/:id", blogController.destroy);

// Blogs Categories Actions
router.post("/blogs_categories", blogCategoryController.add);
router.delete("/blogs_categories/:blogId/:categoryId", blogCategoryController.destroy);

// Likes Actions
router.post("/users_articles", userLikeArticleController.add);
router.delete("/users_articles", userLikeArticleController.destroy);

// Themes Actions
router.post("/themes", themeController.add);

// Roles Actions
router.post("/users_roles", userRoleController.add);

module.exports = router;