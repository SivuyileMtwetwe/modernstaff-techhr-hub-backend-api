import express from "express";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { pool } from "../config/db.js";

const router = express.Router();

// Get Employees
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [employees] = await pool.execute("SELECT * FROM Employees");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

// Add Employee
router.post("/", authenticateAdmin, async (req, res) => {
  const { name, position, department_id, salary, contact, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.execute(
      "INSERT INTO Employees (name, position, department_id, salary, contact, password) VALUES (?, ?, ?, ?, ?, ?)",
      [name, position, department_id, salary, contact, hashedPassword]
    );
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
