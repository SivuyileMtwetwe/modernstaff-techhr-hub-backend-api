import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user from the database
    const [users] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role, employee_id: user.employee_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token and user role to the frontend
    res.json({ token, role: user.role, employee_id: user.employee_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;