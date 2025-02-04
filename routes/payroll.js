import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { generatePayslip } from "../utils/payslip.js";

const router = express.Router();
const employees = []; // Temporary employee data
const attendanceRecords = []; // Temporary attendance data

// Generate Payslip (Employee Only)
router.post("/", authenticateUser, async (req, res) => {
  const { employeeId, startDate, endDate } = req.body;

  // Find employee
  const employee = employees.find((e) => e.id == employeeId);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  // Filter attendance for the requested period
  const attendance = attendanceRecords.filter((a) => {
    return a.employeeId == employeeId && a.date >= startDate && a.date <= endDate;
  });

  // Generate payslip
  const payslip = generatePayslip(employee, attendance);
  res.json(payslip);
});

export default router;
