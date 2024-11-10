const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const cors = require('cors'); 

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.post('/upload', upload.array('attachments', 10), (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const fileCount = req.files.length;
  const uploadedFiles = req.files.map(file => ({
    originalName: file.originalname,
    filename: file.filename,
  }));

  res.json({
    message: 'Files uploaded successfully',
    count: fileCount,
    files: uploadedFiles,
  });
});

app.get('/file-count', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading files' });
    }
    res.json({ fileCount: files.length });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
