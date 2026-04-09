const pool = require("../../db");

const createRecipe = async (title, description, ingredients, steps, userId) => {
  const result = await pool.query(
    `INSERT INTO recipes (title, description, ingredients, steps, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, ingredients, steps, userId]
  );
  return result.rows[0];
};

const getAllRecipes = async () => {
  const result = await pool.query("SELECT * FROM recipes");
  return result.rows;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
