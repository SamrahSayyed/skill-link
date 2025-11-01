const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ----------------------
// LIKE a post
// ----------------------
router.post('/', async (req, res) => {
  const { user_id, post_id } = req.body;

  if (!user_id || !post_id) {
    return res.status(400).json({ error: 'user_id and post_id are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)',
      [user_id, post_id]
    );
    res.status(201).json({ id: result.insertId, user_id, post_id });
  } catch (err) {
    console.error('LIKE POST ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET all likes
// ----------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM post_likes');
    res.json(rows);
  } catch (err) {
    console.error('GET ALL POST LIKES ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET likes for a specific post
// ----------------------
router.get('/:post_id', async (req, res) => {
  const { post_id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT pl.id, pl.user_id, u.username FROM post_likes pl JOIN users u ON pl.user_id = u.id WHERE pl.post_id = ?',
      [post_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No likes found for this post' });
    }

    res.json(rows);
  } catch (err) {
    console.error('GET POST LIKES ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// UNLIKE a post
// ----------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM post_likes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Like not found' });
    }

    res.json({ message: 'Like removed successfully' });
  } catch (err) {
    console.error('DELETE POST LIKE ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
