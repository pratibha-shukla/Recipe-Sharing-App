

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please log in to continue</h4>
        <p className="text-muted">You need to be authenticated to access this page.</p>
      </div>
    );
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

     <main className="flex-grow-1 container mt-4">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/recipes" element={<Recipes />} />
    <Route
      path="/create"
      element={
        <ProtectedRoute>
          <CreateRecipe />
        </ProtectedRoute>
      }
    />
  </Routes>
</main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

