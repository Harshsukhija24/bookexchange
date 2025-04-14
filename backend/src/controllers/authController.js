const db = require("../config/db");
const User = require("../models/User");

const generateId = () => Math.random().toString(36).substr(2, 9);

const authController = {
  register: (req, res) => {
    try {
      const { name, email, password, mobileNumber, role } = req.body;

      // Validate required fields
      if (!name || !email || !password || !mobileNumber || !role) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Validate role
      if (!["seeker", "owner"].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Check if user already exists
      if (db.users.some((user) => user.email === email)) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create new user
      const newUser = new User({
        id: generateId(),
        name,
        email,
        password, // In a real app, this should be hashed
        mobileNumber,
        role,
      });

      db.users.push(newUser);

      // Return user data without password
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },

  login: (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // Find user and verify password
      const user = db.users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = authController;
