const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import the cors package

const app = express();

// Enable CORS for all origins (or you can specify a specific origin)
app.use(cors());

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
