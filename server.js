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
    SCRAP: process.argv.includes('--scrap')
}
console.log(`[SERVER] API: ${API}`);

// Static assets
app.use('/shared', express.static(
    path.join(__dirname, './client/shared')));

// Routes
const router = express.Router();
router.get('/scrap', (req, res) => {
    console.log(`[SERVER] Requested url: ${req.url}`);
    res.sendFile(__dirname, './client/scrap/index.html');
});

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