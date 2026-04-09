const recipeService = require("../services/recipe.service");

// Create a recipe (auth required via middleware)
const createRecipe = async (req, res) => {
  try {
    const recipe = await recipeService.createRecipe({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      userId: req.user.id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update recipe (only owner)
const updateRecipe = async (req, res) => {
  try {
    const updated = await recipeService.updateRecipe(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
      }
    );
    if (!updated) return res.status(404).json({ message: "Recipe not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete recipe (only owner)
const deleteRecipe = async (req, res) => {
  try {
    const ok = await recipeService.deleteRecipe(req.params.id);
    if (!ok) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
};
