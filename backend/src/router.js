const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

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

module.exports = router;