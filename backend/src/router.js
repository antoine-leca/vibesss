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


const articleController = require("./controllers/articleController")


router.get("/articles", articleController.browse);
router.get("/articles/:id", articleController.read);
router.put("/articles/:id", articleController.edit);
router.delete("/articles/:id", articleController.destroy);

router.post("/articles", articleController.add);

router.delete("/articles/user/:userId", articleController.destroyAllbyUser);







module.exports = router;