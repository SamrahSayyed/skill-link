const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Get all user-skill mappings
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user_skills");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all skills for a specific user
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT us.id, s.skill_name 
       FROM user_skills us 
       JOIN skills s ON us.skill_id = s.id 
       WHERE us.user_id = ?`,
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a skill for a user
router.post("/", async (req, res) => {
  const { user_id, skill_id } = req.body;
  if (!user_id || !skill_id)
    return res.status(400).json({ message: "user_id and skill_id are required" });

  try {
    const [result] = await db.query(
      "INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)",
      [user_id, skill_id]
    );
    res.status(201).json({ message: "Skill added to user", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a user-skill mapping
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM user_skills WHERE id = ?", [id]);
    res.json({ message: "User skill removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
