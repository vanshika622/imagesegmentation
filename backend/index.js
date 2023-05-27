const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// MongoDB Atlas connection string


// Route to handle image upload and segmentation
app.post('/upload', upload.array('image'), async (req, res) => {
  const images = req.files;

  // Verify that at least one image is provided
  if (!images || images.length === 0) {
    return res.status(400).json({ success: false, message: 'At least one image is required.' });
  }

  // Create the directory for the user's segments
  const userId = '1234'; // Replace with actual user ID
  const userDir = `uploads/${userId}`;
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir);
  }

  // Segment each image and save the segments to the user's directory
  const segments = [];
  for (const image of images) {
    const imagePath = path.join(__dirname, image.path);
    const segmentPaths = await segmentImage(imagePath);
    for (const segmentPath of segmentPaths) {
      const segmentName = path.basename(segmentPath);
      const destPath = path.join(userDir, segmentName);
      fs.copyFileSync(segmentPath, destPath);
      segments.push(destPath);
    }
  }

  // Connect to MongoDB Atlas
  const client = new MongoClient(uri, options);
  await client.connect();

  try {
    // Get a handle to the segments collection
    const db = client.db('<dbname>');
    const segmentsCollection = db.collection('segments');

    // Insert the segments into the segments collection
    const result = await segmentsCollection.insertMany({ user: userId, segments });

    return res.status(200).json(segments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error saving segments.' });
  } 
})
   
