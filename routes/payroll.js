import express from 'express';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';
import db from '../config/db.js';

const router = express.Router();

// Generate payroll
router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    
    await db.query(
      'INSERT INTO Payroll (employee_id, hours_worked, leave_deductions, final_salary) VALUES (?, ?, ?, ?)',
      [employee_id, hours_worked, leave_deductions, final_salary]
    );
    
    res.status(201).json({ message: 'Payroll generated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;