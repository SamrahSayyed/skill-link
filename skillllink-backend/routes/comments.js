const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// 🟢 Get all comments for a post with user info
router.get("/:postId", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         comments.id AS comment_id,
         comments.post_id,
         comments.user_id,
         comments.content AS comment_text,
         comments.created_at,
         users.username AS user_name,
         users.profileImage AS user_profile_pic
       FROM comments
       LEFT JOIN users ON comments.user_id = users.id
       WHERE comments.post_id = ?
       ORDER BY comments.created_at DESC`,
      [req.params.postId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Add a comment and return it with user info
router.post("/", async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;

    const [result] = await pool.query(
      "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
      [post_id, user_id, content]
    );

    // Fetch the newly created comment with user info
    const [rows] = await pool.query(
      `SELECT 
         comments.id AS comment_id,
         comments.post_id,
         comments.user_id,
         comments.content AS comment_text,
         comments.created_at,
         users.username AS user_name,
         users.profileImage AS user_profile_pic
       FROM comments
       LEFT JOIN users ON comments.user_id = users.id
       WHERE comments.id = ?`,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
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
