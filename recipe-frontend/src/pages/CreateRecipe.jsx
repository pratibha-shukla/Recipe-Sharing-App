import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function CreateRecipe() {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post(
        "/api/recipes",
        { title, description, ingredients, steps },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Recipe created");
      setTitle("");
      setDescription("");
      setIngredients("");
      setSteps("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Create Recipe</h2>

      <form className="card p-4 shadow" onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-3"
          placeholder="Short description"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Ingredients (comma separated)"
          rows="3"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Steps"
          rows="3"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <button className="btn btn-success w-100" disabled={!token || loading}>
          {loading ? "Saving..." : "Create"}
        </button>
        {!token && (
          <p className="text-danger small mt-2">
            Login first to create recipes.
          </p>
        )}
      </form>
    </div>
  );
}
