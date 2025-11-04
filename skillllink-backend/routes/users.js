const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// ----------------------
// GET all users
// ----------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, username, email, location, bio, created_at FROM users'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET ALL USERS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET single user by ID
// ----------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT id, username, email, location, bio, created_at FROM users WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET USER ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// SIGNUP / REGISTER user
// ----------------------
router.post('/', async (req, res) => {
  const { username, email, password, location, bio } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash, location, bio) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, location || null, bio || null]
    );

    res.status(201).json({
      id: result.insertId,
      username,
      email,
      location: location || null,
      bio: bio || null
    });
  } catch (err) {
    console.error('SIGNUP ERROR:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// LOGIN user
// ----------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, username, email, location, bio, password_hash FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    delete user.password_hash;

    res.json({
      message: 'Login successful',
      user
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// UPDATE user
// ----------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, location, bio } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET username = ?, email = ?, location = ?, bio = ? WHERE id = ?',
      [username, email, location, bio, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('UPDATE USER ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// DELETE user
// ----------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('DELETE USER ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
