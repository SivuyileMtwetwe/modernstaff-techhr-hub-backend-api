import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { pool } from "../server.js";

const router = express.Router();

// Mark Attendance
router.post("/", authenticateUser, async (req, res) => {
  const { employeeId, status } = req.body;

  try {
    await pool.execute(
      "INSERT INTO Attendance (employee_id, date, status) VALUES (?, CURDATE(), ?)",
      [employeeId, status]
    );
    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
