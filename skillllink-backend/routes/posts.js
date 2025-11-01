const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ----------------------
// GET all posts
// ----------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts');
    res.json(rows);
  } catch (err) {
    console.error('GET ALL POSTS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET posts by user
// ----------------------
router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE user_id = ?', [user_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }
    res.json(rows);
  } catch (err) {
    console.error('GET POSTS BY USER ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET single post by ID
// ----------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET POST BY ID ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// CREATE new post
// ----------------------
router.post('/', async (req, res) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ error: 'user_id and content are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [user_id, content]
    );
    res.status(201).json({ id: result.insertId, user_id, content });
  } catch (err) {
    console.error('CREATE POST ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// DELETE post
// ----------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('DELETE POST ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
