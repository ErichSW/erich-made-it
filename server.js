const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "works" directory
app.use('/works', express.static(path.join(__dirname, 'works')));

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get the list of works
app.get('/works', (req, res) => {
    const worksDir = path.join(__dirname, 'works');
    fs.readdir(worksDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        const works = files
            .filter(dirent => dirent.isDirectory())
            .map(dirent => {
                const workFolder = path.join(worksDir, dirent.name);
                const imageFiles = fs.readdirSync(workFolder).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
                const image = imageFiles.length > 0 ? imageFiles[0] : null;
                return { folder: `works/${dirent.name}`, title: dirent.name, image };
            });
        res.json(works);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});