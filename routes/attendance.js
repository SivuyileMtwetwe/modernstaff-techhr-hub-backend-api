import express from 'express';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';
import db from '../config/db.js';

const router = express.Router();

// Record attendance
router.post('/', authenticate, async (req, res) => {
  try {
    const { employee_id, date, status } = req.body;
    
    await db.query(
      'INSERT INTO Attendance (employee_id, date, status) VALUES (?, ?, ?)',
      [employee_id, date, status]
    );
    
    res.status(201).json({ message: 'Attendance recorded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get attendance records
router.get('/:employee_id', authenticate, async (req, res) => {
  try {
    const [records] = await db.query(
      'SELECT * FROM Attendance WHERE employee_id = ?',
      [req.params.employee_id]
    );
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;