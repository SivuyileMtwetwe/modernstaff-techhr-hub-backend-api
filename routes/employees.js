import express from 'express';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';
import db from '../config/db.js';

const router = express.Router();

// Get all employees
router.get('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const [employees] = await db.query(`
      SELECT e.*, d.department_name 
      FROM Employees e
      JOIN Departments d ON e.department_id = d.department_id
    `);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single employee
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [employee] = await db.query(
      'SELECT * FROM Employees WHERE employee_id = ?',
      [req.params.id]
    );
    res.json(employee[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;