import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../server.js";

dotenv.config();
const router = express.Router();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.employee_id, role: user.position },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Employee Login
router.post("/login", async (req, res) => {
  const { contact } = req.body;

  try {
    const [users] = await pool.execute(
      "SELECT * FROM Employees WHERE contact = ?",
      [contact]
    );

    if (users.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = users[0];
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.employee_id,
        name: user.name,
        position: user.position,
        role: user.position,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

export default router;
