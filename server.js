const express = require('express');
const { getGeminiResponse } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// API Endpoint to get the scraped response
app.get('/api/gemini', async (req, res) => {
    try {
        console.log('Incoming request to /api/gemini');
        // Call your original scraping function
  const response = await getGeminiResponse();
        
        if (!response || response.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No response found."
            });
        }

        // Return the data as a JSON response
        res.json({
            success: true,
            count: response.length,
            data: response
        });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the response."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Server is running on http://localhost:${PORT}`);
    console.log(`👉 Access the news at: http://localhost:${PORT}/api/gemini=query?=${encodeURIComponent}`);
});
