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

const updateRecipe = async (id, fields) => {
  // Build dynamic set clause
  const updates = [];
  const values = [];
  let idx = 1;

  if (fields.title !== undefined) {
    updates.push(`title = $${idx++}`);
    values.push(fields.title);
  }
  if (fields.description !== undefined) {
    updates.push(`description = $${idx++}`);
    values.push(fields.description);
  }
  if (fields.ingredients !== undefined) {
    updates.push(`ingredients = $${idx++}`);
    values.push(fields.ingredients);
  }
  if (fields.steps !== undefined) {
    updates.push(`steps = $${idx++}`);
    values.push(fields.steps);
  }

  if (updates.length === 0) return null;

  values.push(id);

  const result = await pool.query(
    `UPDATE recipes SET ${updates.join(", ")}
     WHERE id = $${idx}
     RETURNING *`,
    values
  );

  return result.rows[0] || null;
};

const deleteRecipe = async (id) => {
  const result = await pool.query(
    `DELETE FROM recipes WHERE id = $1 RETURNING id`,
    [id]
  );
  return result.rowCount > 0;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
};
