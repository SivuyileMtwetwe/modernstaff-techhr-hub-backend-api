import express from "express";
import { authenticateUser, authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const leaveRequests = [];

// Submit leave request (Employee only)
router.post("/", authenticateUser, (req, res) => {
  const { employeeId, date, reason } = req.body;
  const request = { id: leaveRequests.length + 1, employeeId, date, reason, status: "Pending" };

  leaveRequests.push(request);
  res.json({ message: "Leave request submitted", request });
});

// Approve or Reject leave request (Admin only)
router.put("/:id", authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const request = leaveRequests.find((r) => r.id == id);

  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = status;
  res.json({ message: "Leave request updated", request });
});

export default router;
