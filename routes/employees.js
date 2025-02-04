import express from "express";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const employees = []; // Temporary storage

// Get all employees (Admin only)
router.get("/", authenticateAdmin, (req, res) => {
  res.json(employees);
});

// Add a new employee (Admin only)
router.post("/", authenticateAdmin, (req, res) => {
  const { name, position, department, salary } = req.body;
  const employeeId = employees.length + 1;
  const newEmployee = { id: employeeId, name, position, department, salary };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update an employee (Admin only)
router.put("/:id", authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id == id);

  if (!employee) return res.status(404).json({ message: "Employee not found" });

  Object.assign(employee, req.body);
  res.json({ message: "Employee updated", employee });
});

// Delete an employee (Admin only)
router.delete("/:id", authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex((e) => e.id == id);

  if (index === -1) return res.status(404).json({ message: "Employee not found" });

  employees.splice(index, 1);
  res.json({ message: "Employee deleted" });
});

export default router;
