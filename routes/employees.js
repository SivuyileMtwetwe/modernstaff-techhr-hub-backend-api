import express from "express";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { pool } from "../server.js";

const router = express.Router();

// Get all employees
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
  const { name, position, department_id, salary, contact } = req.body;

  try {
    await pool.execute(
      "INSERT INTO Employees (name, position, department_id, salary, contact) VALUES (?, ?, ?, ?, ?)",
      [name, position, department_id, salary, contact]
    );
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
