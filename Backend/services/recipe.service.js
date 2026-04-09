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

exports.updateRecipe = async (id, fields) => {
  return Recipe.updateRecipe(id, fields);
};

exports.deleteRecipe = async (id) => {
  return Recipe.deleteRecipe(id);
};
