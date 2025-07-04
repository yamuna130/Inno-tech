const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const users = [{ email: "admin@test.com", password: "admin123" }];
const SECRET = process.env.JWT_SECRET || 'secret';

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.post('/api/tagline', authenticate, async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Write a catchy marketing tagline for: ${prompt}` }],
      max_tokens: 20,
    });

    const tagline = result.choices[0].message.content;
    console.log("✅ Tagline:", tagline);
    res.json({ tagline });
  } catch (err) {
    console.error("❌ OpenAI Error:", err.response?.data || err.message || err);
    res.status(500).json({
      message: "OpenAI API call failed",
      error: err.response?.data || err.message || err
    });
  }
});

app.listen(3000, () => console.log("🚀 Backend running at http://localhost:3000"));
