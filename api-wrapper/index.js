const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Load scent data from parent directory
const loadScents = (filename) => {
    try {
        const filePath = path.join(__dirname, '..', filename);
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    } catch (err) {
        console.error(`Error loading ${filename}:`, err.message);
        return [];
    }
};

const pleasantScents = loadScents('pleasant.txt');
const pungentScents = loadScents('pungent.txt');

app.use(cors());
app.use(express.json());

// --- Rate Limiting Configuration ---
// Limit each IP to 100 requests per 15 minutes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes',
        status: 429
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiter to all /api routes
app.use('/api/', apiLimiter);


// --- API Key Authentication (Optional) ---
const authenticateKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    const validKey = process.env.SCENT_API_KEY;

    // If an API key is configured in .env, enforce it
    if (validKey) {
        if (!apiKey || apiKey !== validKey) {
            return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
        }
    }
    next();
};


// --- Routes ---

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Scent Generator API is running' });
});

// Generate a random scent combo
app.get('/api/generate', authenticateKey, (req, res) => {
    if (pleasantScents.length === 0 || pungentScents.length === 0) {
        return res.status(500).json({ error: 'Scent data is currently unavailable.' });
    }

    const pleasant = pleasantScents[Math.floor(Math.random() * pleasantScents.length)];
    const pungent = pungentScents[Math.floor(Math.random() * pungentScents.length)];

    res.json({
        pleasant,
        pungent,
        combo: `${pleasant} and ${pungent}`
    });
});

// Get all raw scents
app.get('/api/scents', authenticateKey, (req, res) => {
    res.json({
        pleasantCount: pleasantScents.length,
        pungentCount: pungentScents.length,
        pleasant: pleasantScents,
        pungent: pungentScents
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🧪 Scent Generator API is running on http://localhost:${PORT}`);
    console.log(`Rate Limiting: ENABLED (100 req / 15m)`);
    if (process.env.SCENT_API_KEY) {
        console.log(`Authentication: ENABLED (x-api-key required)`);
    } else {
        console.log(`Authentication: DISABLED (Public mode)`);
    }
});
