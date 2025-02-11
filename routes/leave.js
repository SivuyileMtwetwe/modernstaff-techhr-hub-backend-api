// File: routes/employees.js
import express from 'express';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';
import db from '../config/db.js';

const router = express.Router();

// Get all employees
router.get('/', authenticate, authorizeRole('Admin'), async (req, res) => {
  try {
    const [employees] = await db.query('SELECT * FROM Employees');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single employee
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [employee] = await db.query('SELECT * FROM Employees WHERE employee_id = ?', [req.params.id]);
    if (employee.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new employee
router.post('/', authenticate, authorizeRole('Admin'), async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    await db.query('INSERT INTO Employees (name, position, department, salary) VALUES (?, ?, ?, ?)', [name, position, department, salary]);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update employee details
router.put('/:id', authenticate, authorizeRole('Admin'), async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    await db.query('UPDATE Employees SET name = ?, position = ?, department = ?, salary = ? WHERE employee_id = ?', [name, position, department, salary, req.params.id]);
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete employee
router.delete('/:id', authenticate, authorizeRole('Admin'), async (req, res) => {
  try {
    await db.query('DELETE FROM Employees WHERE employee_id = ?', [req.params.id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
