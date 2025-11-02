require('dotenv').config();
console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST);

const express = require('express');
const db = require('./config/db');


const app = express();


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true,
}));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);
const commentsRoutes = require("./routes/comments");
app.use("/api/comments", commentsRoutes);
const postLikesRoutes = require("./routes/post_likes");
app.use("/api/post_likes", postLikesRoutes);
const connectionsRoutes = require("./routes/connections");
app.use('/api/connections', connectionsRoutes);
const skillsRoutes = require("./routes/skills");
app.use("/api/skills", skillsRoutes);
const userSkillsRoutes = require("./routes/user_skills");
app.use("/api/user_skills", userSkillsRoutes);





// Test route
app.get('/', (req, res) => {
  res.send('SkillLink Backend Running');
});

// Test DB connection
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
