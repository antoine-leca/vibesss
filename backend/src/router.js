const express = require("express");

const router = express.Router();

// ------------ ROUTES USERS
const userController = require("./controllers/userController");

const {
    hashPassword,
    verifyPassword,
    verifyToken,
} = require("./auth");

// ------------- Auth 
router.post("/auth/register", hashPassword, userController.add);
router.post("/auth/login", userController.getUserByEmail, verifyPassword)
router.put("/users/:id", hashPassword, userController.edit);
router.get("/admin/stats", userController.getStats);
router.get("/admin/activities", userController.getActivities);
router.use(verifyToken);
// ------------- Routes users basiques 
router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.post("/users/", userController.getUserByEmail);
router.post("/users/", userController.getUserByPseudo);
router.delete("/users/:id", userController.destroy);



const notifController = require("./controllers/notifController");

router.get("/notifications", notifController.browse);
router.get("/notifications/unread/:userId", notifController.getUnread);
router.post("/notifications", notifController.add);
router.put("/notifications/:id", notifController.markAsRead);
router.delete("/notifications/:id", notifController.destroy);




const articleController = require("./controllers/articleController")

router.get("/articles", articleController.browse);
router.get("/articles/:id", articleController.read);
router.put("/articles/:id", articleController.edit);
router.delete("/articles/:id", articleController.destroy);
router.post("/articles", articleController.add);
router.delete("/articles/user/:userId", articleController.destroyAllbyUser);


const reportController = require("./controllers/reportController")

router.get("/reports", reportController.browse);
router.post("/reports", reportController.add);
router.put("/reports/:id", reportController.edit);
router.delete("/reports/:id", reportController.destroy);


const userReportController = require("./controllers/userReportController");

router.get("/users_reports", userReportController.browse);
router.get("/users_reports/:userId/:reportId", userReportController.read);
router.post("/users_reports", userReportController.add);
router.delete("/users_reports/:userId/:reportId", userReportController.destroy);


const commentController = require("./controllers/commentController");

router.get("/comments", commentController.browse);
router.get("/comments/:id", commentController.read);
router.post("/comments", commentController.add);
router.put("/comments/:id", commentController.edit);
router.delete("/comments/:id", commentController.destroy);


const blogController = require("./controllers/blogController");

router.get("/blogs", blogController.browse);
router.get("/blogs/:id", blogController.read);
router.post("/blogs", blogController.add);
router.put("/blogs/:id", blogController.edit);
router.delete("/blogs/:id", blogController.destroy);


const blogCategoryController = require("./controllers/blogCategoryController");

router.get("/blogs_categories", blogCategoryController.browse);
router.get("/blogs_categories/blog/:blogId", blogCategoryController.findByBlogId);
router.get("/blogs_categories/category/:categoryId", blogCategoryController.findByCategoryId);
router.post("/blogs_categories", blogCategoryController.add);
router.delete("/blogs_categories/:blogId/:categoryId", blogCategoryController.destroy);


const userLikeArticleController = require("./controllers/userLikeArticleController");

router.post("/users_articles", userLikeArticleController.add);
router.delete("/users_articles", userLikeArticleController.destroy);


const themeController = require("./controllers/themeController");

router.get("/themes", themeController.browse);
router.get("/themes/:id", themeController.read);
router.post("/themes", themeController.add);
router.put("/themes/:id", themeController.edit);
router.delete("/themes/:id", themeController.destroy);


const roleController = require("./controllers/roleController");

router.get("/roles", roleController.browse);
router.get("/roles/:id", roleController.read);
router.post("/roles", roleController.add);
router.put("/roles/:id", roleController.edit);
router.delete("/roles/:id", roleController.destroy);

const userRoleController = require("./controllers/userRoleController");

router.post("/users_roles", userRoleController.add);
router.delete("/users_roles/:userId/:roleId", userRoleController.destroy);


module.exports = router;