const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemController");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);


const notifController = require("./controllers/notifController");


router.get("/notifications", notifController.browse);
router.get("/notifications/unread/:userId", notifController.getUnread);
router.post("/notifications", notifController.add);
router.put("/notifications/:id", notifController.markAsRead);
router.delete("/notifications/:id", notifController.destroy);

const userController = require("./controllers/userController");

router.get("/users", userController.browse);
router.get("/users/:id", userController.read);
router.post("/users/email", userController.getUserByEmail);
router.post("/users/pseudo", userController.getUserByPseudo);
router.post("/users", userController.add);
router.put("/users/:id", userController.edit);
router.delete("/users/:id", userController.destroy);

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


const userLikeArticleController = require("./controllers/userLikeArticleController");

router.post("/users_articles", userLikeArticleController.add);
router.delete("/users_articles", userLikeArticleController.destroy);



module.exports = router;