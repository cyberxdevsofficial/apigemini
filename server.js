const express = require('express');
const { getCricketNews } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// API Endpoint to get the scraped news
app.get('/api/news', async (req, res) => {
    try {
        console.log('Incoming request to /api/news');
        // Call your original scraping function
        const newsData = await getCricketNews();
        
        if (!newsData || newsData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No news found at this time."
            });
        }

        // Return the data as a JSON response
        res.json({
            success: true,
            count: newsData.length,
            data: newsData
        });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the news."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Server is running on http://localhost:${PORT}`);
    console.log(`👉 Access the news at: http://localhost:${PORT}/api/news`);
});
