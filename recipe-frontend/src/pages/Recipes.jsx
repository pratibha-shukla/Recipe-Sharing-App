import { useEffect, useState, useContext } from "react";
import api from "../api";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  useEffect(() => {
    api
      .get("/api/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load recipes");
      })
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (recipe) => {
    if (!token) {
      setError("Login required to edit.");
      return;
    }
    setEditing(recipe);
    setForm({
      title: recipe.title || "",
      description: recipe.description || "",
      ingredients: recipe.ingredients || "",
      steps: recipe.steps || "",
    });
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      const res = await api.put(`/api/recipes/${editing.id}`, form);
      setRecipes((prev) =>
        prev.map((r) => (r.id === editing.id ? res.data : r))
      );
      setEditing(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update recipe");
    }
  };

  const deleteRecipe = async (id) => {
    if (!token) {
      setError("Login required to delete.");
      return;
    }
    try {
      await api.delete(`/api/recipes/${id}`);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete recipe");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Recipes</h2>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-danger">{error}</p>}

      {editing && (
        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">Edit Recipe</h5>
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            rows="2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Ingredients"
            rows="2"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Steps"
            rows="3"
            value={form.steps}
            onChange={(e) => setForm({ ...form, steps: e.target.value })}
          />

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={saveEdit}>
              Save
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={recipe.id}>
            <RecipeCard
              recipe={recipe}
              canEdit={!!token}
              onEdit={() => startEdit(recipe)}
              onDelete={() => deleteRecipe(recipe.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

