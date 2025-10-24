const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ----------------------
// SEND connection request
// ----------------------
router.post('/', async (req, res) => {
  const { requester_id, addressee_id } = req.body;

  if (!requester_id || !addressee_id) {
    return res.status(400).json({ error: 'requester_id and addressee_id are required' });
  }

  // Avoid self-connection
  if (requester_id === addressee_id) {
    return res.status(400).json({ error: 'Cannot connect with yourself' });
  }

  // Determine min/max for uniqueness
  const min_user_id = Math.min(requester_id, addressee_id);
  const max_user_id = Math.max(requester_id, addressee_id);

  try {
    // Check if a connection already exists
    const [existing] = await db.query(
      'SELECT * FROM connections WHERE min_user_id = ? AND max_user_id = ?',
      [min_user_id, max_user_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Connection request already exists or is pending' });
    }

    // Insert new connection
    const [result] = await db.query(
      'INSERT INTO connections (requester_id, addressee_id, status, min_user_id, max_user_id) VALUES (?, ?, "pending", ?, ?)',
      [requester_id, addressee_id, min_user_id, max_user_id]
    );

    res.status(201).json({
      id: result.insertId,
      requester_id,
      addressee_id,
      status: 'pending'
    });

  } catch (err) {
    console.error('SEND CONNECTION ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// ACCEPT/REJECT connection
// ----------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const [result] = await db.query(
      'UPDATE connections SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Connection not found' });

    res.json({ message: `Connection ${status} successfully` });

  } catch (err) {
    console.error('UPDATE CONNECTION ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// GET all connections for a user
// ----------------------
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM connections 
       WHERE requester_id = ? OR addressee_id = ?`,
      [user_id, user_id]
    );

    if (rows.length === 0) return res.status(404).json({ error: 'No connections found for this user' });

    res.json(rows);

  } catch (err) {
    console.error('GET CONNECTIONS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// DELETE connection
// ----------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM connections WHERE id = ?', [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Connection not found' });

    res.json({ message: 'Connection deleted successfully' });

  } catch (err) {
    console.error('DELETE CONNECTION ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
