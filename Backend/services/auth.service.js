const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Keep in sync with middleware; use env var in production
const JWT_SECRET = "SECRET123";

const registerUser = async (name, email, password) => {
  const hashed = await bcrypt.hash(password, 10);
  return User.createUser(name, email, hashed);
};

const loginUser = async (email, password) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // Do not expose password to the client
  delete user.password;
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};

