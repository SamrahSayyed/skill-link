const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ----------------------
// GET all skills
// ----------------------
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, category FROM skills');
    res.json(rows);
  } catch (err) {
    console.error('GET SKILLS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET single skill by ID
// ----------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT id, name, category FROM skills WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Skill not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET SKILL ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// CREATE new skill
// ----------------------
router.post('/', async (req, res) => {

  // <-- Add this line temporarily to debug
  console.log('Request body:', req.body);

  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'Name and category are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO skills (name, category) VALUES (?, ?)',
      [name, category]
    );
    res.status(201).json({ id: result.insertId, name, category });
  } catch (err) {
    console.error('CREATE SKILL ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});


// ----------------------
// UPDATE skill
// ----------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE skills SET name = ?, category = ? WHERE id = ?',
      [name, category, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Skill updated successfully' });
  } catch (err) {
    console.error('UPDATE SKILL ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// DELETE skill
// ----------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('DELETE SKILL ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
