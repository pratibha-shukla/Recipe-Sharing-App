

import React, { useState } from "react";

export default function RecipeCard({ recipe, canEdit, onEdit, onDelete }) {
  // Random photo per recipe using picsum seed (stable per id/title)
  const seed = recipe.id || recipe.title || Math.random();
  const placeholder = `https://picsum.photos/seed/${encodeURIComponent(
    seed
  )}/400/220`;

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card shadow-sm mb-4" style={{ borderRadius: "10px" }}>
      <img
        src={recipe.image || placeholder}
        alt={recipe.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h4 className="card-title mb-2">{recipe.title}</h4>
        <p className="card-text text-muted mb-3">
          {recipe.description || "No description provided."}
        </p>

        {showDetails && (
          <div className="small text-secondary mb-3">
            <div><strong>Ingredients:</strong> {recipe.ingredients || "—"}</div>
            <div><strong>Steps:</strong> {recipe.steps || "—"}</div>
          </div>
        )}

        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? "Hide details" : "View"}
          </button>
          {canEdit && (
            <>
              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
