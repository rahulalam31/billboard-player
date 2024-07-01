const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const dayjs = require('dayjs');

// Load environment variables
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const DATA_FILE_PATH = path.join(__dirname, '../data/recent.json');

// Function to search YouTube for a video ID, title, thumbnails, and channel title
const youtubeSearch = async (query) => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: YOUTUBE_API_KEY,
                part: 'snippet',
                order: 'viewCount',
                q: query,
                maxResults: 100,
                regionCode: 'IN',
                relevanceLanguage: 'hi',
            }
        });

        const items = response.data.items || [];

        return items.map(item => ({
            videoId: item.id.videoId || '',
            title: item.snippet.title || '',
            thumbnails: item.snippet.thumbnails || {},
            channelTitle: item.snippet.channelTitle || ''
        }));
    } catch (error) {
        console.error(`Error searching YouTube for ${query}: ${error.message}`);
        return [];
    }
};

// Main function to update the recent data
const updateRecentData = async () => {
    try {
        // Define the search query
        const query = 'trending hindi song';

        // Get YouTube search results
        const youtubeData = await youtubeSearch(query);

        // Save YouTube data to recent.json
        const currentDate = dayjs().format('YYYY-MM-DD');
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({ date: currentDate, data: youtubeData }, null, 2), 'utf-8');
        console.log('New data saved successfully');
    } catch (error) {
        console.error(`Error updating recent data: ${error.message}`);
    }
};

// Execute the main function
updateRecentData();