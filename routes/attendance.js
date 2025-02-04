import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();
const attendanceRecords = [];

// Mark attendance (Employee only)
router.post("/", authenticateUser, (req, res) => {
  const { employeeId, status } = req.body;
  const record = { employeeId, date: new Date().toISOString().split("T")[0], status };

  attendanceRecords.push(record);
  res.json({ message: "Attendance marked", record });
});

// Get all attendance records (Admin only)
router.get("/", authenticateUser, (req, res) => {
  res.json(attendanceRecords);
});

export default router;
