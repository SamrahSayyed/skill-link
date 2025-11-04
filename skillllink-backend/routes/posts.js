const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ----------------------
// GET all posts with username
// ----------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        posts.id AS post_id,
        posts.user_id,
        posts.content,
        posts.image_url,
        posts.created_at,
        users.username
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('GET ALL POSTS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET posts by specific user
// ----------------------
router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT 
        posts.id AS post_id,
        posts.user_id,
        posts.content,
        posts.image_url,
        posts.created_at,
        users.username
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
      WHERE posts.user_id = ?
      ORDER BY posts.created_at DESC
    `, [user_id]);

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
// CREATE new text-only post
// ----------------------
router.post('/', async (req, res) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ error: 'user_id and content are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
      [user_id, content, null] // text-only post
    );

    const [rows] = await db.query(`
      SELECT 
        posts.id AS post_id,
        posts.user_id,
        posts.content,
        posts.image_url,
        posts.created_at,
        users.username
      FROM posts
      LEFT JOIN users ON posts.user_id = users.id
      WHERE posts.id = ?
    `, [result.insertId]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('CREATE POST ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
