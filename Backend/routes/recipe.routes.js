const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const recipeController = require("../controllers/recipe.controller");

router.get("/", recipeController.getAllRecipes);
router.post("/", authMiddleware, recipeController.createRecipe);

module.exports = router;


