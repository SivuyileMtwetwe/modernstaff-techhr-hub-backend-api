import express from "express";
import bcrypt from "bcryptjs";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { pool } from "../config/db.js";
import { User } from "../models/user.js"; // MongoDB User model

const router = express.Router();

// 🔹 1️⃣ Get All Employees (Admin Only)
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const [employees] = await pool.execute("SELECT * FROM Employees");
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 2️⃣ Get Single Employee by ID (Admin Only)
router.get("/:id", authenticateAdmin, async (req, res) => {
  const employeeId = req.params.id;

  try {
    const [employee] = await pool.execute(
      "SELECT * FROM Employees WHERE employee_id = ?",
      [employeeId]
    );

    if (employee.length === 0)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee[0]);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 3️⃣ Create a New Employee (Admin Only)
router.post("/", authenticateAdmin, async (req, res) => {
  const { name, position, department_id, salary, contact } = req.body;

  try {
    // 🔹 Step 1: Insert into MySQL
    const [result] = await pool.execute(
      "INSERT INTO Employees (name, position, department_id, salary, contact) VALUES (?, ?, ?, ?, ?)",
      [name, position, department_id, salary, contact]
    );

    // 🔹 Step 2: Generate a default hashed password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // 🔹 Step 3: Save employee credentials in MongoDB
    const newUser = new User({
      name,
      contact,
      password: hashedPassword,
      role: "Employee",
    });

    await newUser.save();

    res.status(201).json({ message: "Employee added successfully!", employee_id: result.insertId });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 4️⃣ Update Employee Details (Admin Only)
router.put("/:id", authenticateAdmin, async (req, res) => {
  const employeeId = req.params.id;
  const { name, position, department_id, salary, contact } = req.body;

  try {
    const [employee] = await pool.execute(
      "SELECT * FROM Employees WHERE employee_id = ?",
      [employeeId]
    );

    if (employee.length === 0)
      return res.status(404).json({ message: "Employee not found" });

    // 🔹 Update MySQL
    await pool.execute(
      "UPDATE Employees SET name = ?, position = ?, department_id = ?, salary = ?, contact = ? WHERE employee_id = ?",
      [name, position, department_id, salary, contact, employeeId]
    );

    // 🔹 Update MongoDB (if contact changes)
    await User.findOneAndUpdate(
      { contact: employee[0].contact },
      { name, contact }
    );

    res.json({ message: "Employee updated successfully!" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// 🔹 5️⃣ Delete Employee (Admin Only)
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const employeeId = req.params.id;

  try {
    const [employee] = await pool.execute(
      "SELECT contact FROM Employees WHERE employee_id = ?",
      [employeeId]
    );

    if (employee.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const contact = employee[0].contact;

    // 🔹 Step 1: Delete related records from dependent tables
    await pool.execute("DELETE FROM Payroll WHERE employee_id = ?", [
      employeeId,
    ]);
    await pool.execute("DELETE FROM Attendance WHERE employee_id = ?", [
      employeeId,
    ]);
    await pool.execute("DELETE FROM LeaveRequests WHERE employee_id = ?", [
      employeeId,
    ]);

    // 🔹 Step 2: Delete from MySQL Employees table
    await pool.execute("DELETE FROM Employees WHERE employee_id = ?", [
      employeeId,
    ]);

    // 🔹 Step 3: Delete from MongoDB (if user exists)
    await User.findOneAndDelete({ contact });

    res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

export default router;
