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

router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const { name,position, department_id, salary ,employment_history,contact} = req.body;
    await db.query('INSERT INTO Employees ( name,position, department_id, salary ,employment_history,contact) VALUES (?, ?, ?,?,?,?)', [ name,position, department_id, salary ,employment_history,contact]);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update employee details
router.put('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    const {name,position, department_id, salary ,employment_history,contact } = req.body;
    await db.query('UPDATE Employees SET name = ?,position = ?, department_id = ?, salary = ? ,employment_history = ?,contact = ? WHERE employee_id = ?', [name,position, department_id, salary ,employment_history,contact, req.params.id]);
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete employee
router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    await db.query('DELETE FROM Employees WHERE employee_id = ?', [req.params.id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;