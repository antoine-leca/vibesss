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

// ------------- ROUTES PUBLIQUES (SANS TOKEN)
// Auth
router.post("/auth/register", hashPassword, userController.add);
router.post("/auth/login", userController.getUserByEmail, verifyPassword);
router.get("/auth/logout", logout);
router.put("/users/:id", hashPassword, userController.edit);

// Reports (Déplacé ici pour les tests)
router.get("/reports", reportController.browse);
router.post("/reports", reportController.add);
router.put("/reports/:id", reportController.edit);
router.delete("/reports/:id", reportController.destroy);

// Stats & Activities
router.get("/admin/stats", userController.getStats);
router.get("/admin/activities", userController.getActivities);

// Users (Lecture publique)
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);

// Comments (Lecture publique)
router.get("/comments", commentController.browse);
router.get("/comments/:id", commentController.read);

// ------------- MIDDLEWARE D'AUTHENTIFICATION

// ------------- ROUTES PROTÉGÉES (AVEC TOKEN)

// Users Actions
router.put("/users/:id", hashPassword, userController.edit);
router.post("/users/email", userController.getUserByEmail);
router.post("/users/pseudo", userController.getUserByPseudo);
router.delete("/users/:id", userController.destroy);

// Notifications
router.get("/notifications", notifController.browse);
router.get("/notifications/unread/:userId", notifController.getUnread);
router.get("/notifications/user/:userId", notifController.getByUser);
router.post("/notifications", notifController.add);
router.put("/notifications/:id", notifController.markAsRead);
router.delete("/notifications/:id", notifController.destroy);

// Articles
router.get("/articles", articleController.browse);
router.get("/articles/:id", articleController.read);
router.put("/articles/:id", articleController.edit);
router.delete("/articles/:id", articleController.destroy);
router.post("/articles", articleController.add);
router.delete("/articles/user/:userId", articleController.destroyAllbyUser);

// Comments
router.post("/comments", commentController.add);
router.put("/comments/:id", commentController.edit);
router.delete("/comments/:id", commentController.destroy);

// Blogs
router.get("/blogs", blogController.browse);
router.get("/blogs/:id", blogController.read);
router.get("/blogs/user/:id", blogController.getByUserId);
router.post("/blogs", blogController.add);
router.put("/blogs/:id", blogController.edit);
router.delete("/blogs/:id", blogController.destroy);

// Blogs Categories
router.get("/blogs_categories", blogCategoryController.browse);
router.get("/blogs_categories/blog/:blogId", blogCategoryController.findByBlogId);
router.post("/blogs_categories", blogCategoryController.add);
router.delete("/blogs_categories/:blogId/:categoryId", blogCategoryController.destroy);

// Likes
router.post("/users_articles", userLikeArticleController.add);
router.delete("/users_articles", userLikeArticleController.destroy);

// Themes
router.get("/themes", themeController.browse);
router.post("/themes", themeController.add);

// Roles
router.get("/roles", roleController.browse);
router.post("/users_roles", userRoleController.add);

// router.use(verifyToken);
module.exports = router;