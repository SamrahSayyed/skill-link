// routes/comments.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// 🟢 Get all comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC",
      [req.params.postId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Add a comment
router.post("/", async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;
    const [result] = await pool.query(
      "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
      [post_id, user_id, content]
    );
    res.json({ id: result.insertId, post_id, user_id, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Update a comment
router.put("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    await pool.query("UPDATE comments SET content = ? WHERE id = ?", [
      content,
      req.params.id,
    ]);
    res.json({ message: "Comment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM comments WHERE id = ?", [req.params.id]);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
