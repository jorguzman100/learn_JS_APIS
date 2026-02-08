// Utils
import chalk from "chalk";

// Express
import express from "express";
const app = express();

// Absolute paths
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect the API
import 'dotenv/config';
const API = {
    SCRAPPER: process.argv.includes('--scrapper')
}
console.log(`[SERVER] API: ${API}`);

// Static assets
app.use(express.static(path.join(__dirname, 'client')));

// Page routes
const router = express.Router();
app.use('/', router); // mount the router / register the routes

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/root.html'));
});

router.get('/scrapper', (req, res) => {
    console.log(`[SERVER] Requested url: ${req.url}`);
    res.sendFile(path.join(__dirname, 'client/scrapper/index.html'));
});

// API routes (JSON, logic)
app.get('/api/scrape', () => {});

// Global error handler
app.use((err, req, res, next) => {
    console.error(chalk.red('[Server] Internal server error'));
    console.error(err.message);
    res.status(err.status || 500).json({
        error: err.message || '[Server] Internal server error',
        path: req.url,
        method: req.method
    });
});

// Launch the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log('[Server] Listening at:');
    console.log(`   💻 Local:  http://localhost:${port}`);
});