import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/user.js";

dotenv.config();
const router = express.Router();

// 🔹 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// 🔹 Register New User (Admin Only)
router.post("/register", async (req, res) => {
  const { name, contact, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ contact });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, contact, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 Login User
router.post("/login", async (req, res) => {
  const { contact, password } = req.body;

  try {
    // 🔹 Find the user in MongoDB
    const user = await User.findOne({ contact });
    if (!user) return res.status(400).json({ message: "User not found" });

    console.log("User found:", user);

    // 🔹 Check if password is stored correctly
    console.log("Stored Password in MongoDB:", user.password);
    console.log("Entered Password:", password);

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 🔹 Generate JWT token
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

export default router;
