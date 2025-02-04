import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const users = []; // Temporary storage, replace with DB later

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Admin & Employee Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token, user: { username: user.username, role: user.role } });
});

// Register (Admin only)
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) return res.status(400).json({ message: "Missing fields" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword, role };
  
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

export default router;
