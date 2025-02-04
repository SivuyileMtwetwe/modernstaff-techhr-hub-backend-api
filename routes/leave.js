import express from "express";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middleware/authMiddleware.js";
import { pool } from "../server.js";

const router = express.Router();

// Submit Leave Request
router.post("/", authenticateUser, async (req, res) => {
  const { employeeId, date, reason } = req.body;

  try {
    await pool.execute(
      "INSERT INTO LeaveRequests (employee_id, date, reason, status) VALUES (?, ?, ?, 'Pending')",
      [employeeId, date, reason]
    );
    res.json({ message: "Leave request submitted" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
