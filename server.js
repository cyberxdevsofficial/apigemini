const express = require('express');
const cors = require('cors');
const { gemini } = require('./scraper'); // your file name (change if different)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    status: "Gemini API is running 🚀",
    endpoint: "/api/gemini?query=your_text"
  });
});

// Gemini API route
app.get('/api/gemini', async (req, res) => {
  const { query, session } = req.query;

  if (!query) {
    return res.status(400).json({
      ok: false,
      error: "Query parameter is required. Example: /api/gemini?query=hello"
    });
  }

  try {
    const result = await gemini(query, { session });

    res.json(result);

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`╔════════════════════════════════════╗`);
  console.log(`║   Gemini API Server Running 🚀    ║`);
  console.log(`║   http://localhost:${PORT}         ║`);
  console.log(`╚════════════════════════════════════╝`);
});
