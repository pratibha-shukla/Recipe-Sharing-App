const authService = require("../services/auth.service");

// Handle user registration
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const data = await authService.loginUser(email, password);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  register,
  login,
};
