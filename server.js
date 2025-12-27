const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from root

// Helper functions
async function readData() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading database:', err);
        return { platforms: [], posts: [] };
    }
}

async function writeData(data) {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing to database:', err);
    }
}

// --- API Endpoints ---

// Platforms
app.get('/api/platforms', async (req, res) => {
    const data = await readData();
    res.json(data.platforms);
});

app.post('/api/platforms', async (req, res) => {
    const data = await readData();
    const newPlatform = req.body;
    if (!newPlatform.id) {
        newPlatform.id = Date.now();
    }
    data.platforms.push(newPlatform);
    await writeData(data);
    res.status(201).json(newPlatform);
});

app.put('/api/platforms/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params.id);
    const updatedPlatform = req.body;

    const index = data.platforms.findIndex(p => p.id === id);
    if (index !== -1) {
        data.platforms[index] = { ...data.platforms[index], ...updatedPlatform };
        await writeData(data);
        res.json(data.platforms[index]);
    } else {
        res.status(404).json({ message: 'Platform not found' });
    }
});

app.delete('/api/platforms/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params.id);
    data.platforms = data.platforms.filter(p => p.id !== id);
    // Optional: Delete associated posts
    data.posts = data.posts.filter(p => p.platformId !== id);

    await writeData(data);
    res.json({ message: 'Platform deleted' });
});

// Posts
app.get('/api/posts', async (req, res) => {
    const data = await readData();
    res.json(data.posts);
});

app.post('/api/posts', async (req, res) => {
    const data = await readData();
    const newPost = req.body;
    if (!newPost.id) {
        newPost.id = Date.now();
    }
    data.posts.push(newPost);
    await writeData(data);
    res.status(201).json(newPost);
});

app.put('/api/posts/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params.id);
    const updatedPost = req.body;

    const index = data.posts.findIndex(p => p.id === id);
    if (index !== -1) {
        data.posts[index] = { ...data.posts[index], ...updatedPost };
        await writeData(data);
        res.json(data.posts[index]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.delete('/api/posts/:id', async (req, res) => {
    const data = await readData();
    const id = parseInt(req.params.id);
    data.posts = data.posts.filter(p => p.id !== id);
    await writeData(data);
    res.json({ message: 'Post deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
