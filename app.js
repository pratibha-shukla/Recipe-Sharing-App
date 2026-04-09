// app.js
const express = require("express");
const cors = require("cors");

const authRoutes = require("./Backend/routes/auth.routes");
const recipeRoutes = require("./Backend/routes/recipe.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Normalize stray CR/LF or spaces that can sneak into copied URLs (prevents /api/...%0A 404s)
app.use((req, _res, next) => {
  req.url = req.url.replace(/%0d/gi, "").replace(/%0a/gi, "").trim();
  next();
});

// Simple request logger
app.use((req, _res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Simple health check / landing route
app.get("/", (req, res) => {
  res.json({ message: "Recipe Sharing API is running. See /api/auth or /api/recipes." });
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
