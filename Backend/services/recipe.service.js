const Recipe = require("../models/recipe.model");

exports.createRecipe = async (data) => {
  return Recipe.createRecipe(
    data.title,
    data.description,
    data.ingredients,
    data.steps,
    data.userId
  );
};

exports.getAllRecipes = async () => {
  return Recipe.getAllRecipes();
};
