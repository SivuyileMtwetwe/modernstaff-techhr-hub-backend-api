import express from 'express';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';
import db from '../config/db.js';

const router = express.Router();

// Submit leave request
router.post('/', authenticate, async (req, res) => {
  try {
    const { employee_id, date, reason } = req.body;
    
    await db.query(
      'INSERT INTO LeaveRequests (employee_id, date, reason, status) VALUES (?, ?, ?, "Pending")',
      [employee_id, date, reason]
    );
    
    res.status(201).json({ message: 'Leave request submitted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/Deny leave (Admin only)
router.patch('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    await db.query(
      'UPDATE LeaveRequests SET status = ? WHERE leave_id = ?',
      [status, req.params.id]
    );
    
    res.json({ message: `Leave request ${status.toLowerCase()}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;