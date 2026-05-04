const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const categoryControllers = require("./controllers/categoryController"); // Import categoryController

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Routes for categories
router.get("/categories", categoryControllers.getAllCategories);
router.get("/categories/:id", categoryControllers.getCategoryById);

module.exports = router;