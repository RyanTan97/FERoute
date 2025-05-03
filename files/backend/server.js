const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontend/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Routes
app.get('/routes', (req, res) => {
    const routesFile = path.join(__dirname, 'routes/routes.json');
    if (fs.existsSync(routesFile)) {
        const routes = JSON.parse(fs.readFileSync(routesFile));
        res.json(routes);
    } else {
        res.json([]);
    }
});

app.post('/routes', (req, res) => {
    const { name, time, difficulty } = req.body;
    const routesFile = path.join(__dirname, 'routes/routes.json');
    const routes = fs.existsSync(routesFile) ? JSON.parse(fs.readFileSync(routesFile)) : [];
    routes.push({ name, time, difficulty });
    fs.writeFileSync(routesFile, JSON.stringify(routes, null, 2));
    res.status(201).json({ message: 'Route added successfully!' });
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(201).json({ message: 'File uploaded successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});