import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { pool } from "../server.js";

const router = express.Router();

// Generate Payslip
router.post("/", authenticateUser, async (req, res) => {
  const { employeeId, startDate, endDate } = req.body;

  try {
    const [attendance] = await pool.execute(
      "SELECT COUNT(*) as workingDays FROM Attendance WHERE employee_id = ? AND date BETWEEN ? AND ? AND status = 'Present'",
      [employeeId, startDate, endDate]
    );

    const workingDays = attendance[0].workingDays;
    const hoursWorked = workingDays * 8;

    const [employees] = await pool.execute("SELECT salary FROM Employees WHERE employee_id = ?", [employeeId]);
    const salary = employees[0]?.salary || 0;
    const hourlyRate = salary / 160;

    const grossSalary = hoursWorked * hourlyRate;
    const tax = grossSalary * 0.2;
    const netSalary = grossSalary - tax;

    res.json({ workingDays, hoursWorked, grossSalary, tax, netSalary });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
