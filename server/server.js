// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path to use for static files
const userRoutes = require('./routes/authRoutes'); // Adjust the path if necessary
const productRoutes = require('./routes/products'); // Adjust path if necessary
// const categoriesRouter = require('./routes/categories');

const app = express();
const PORT = process.env.PORT || 5000;
// app.use('/api/categories', categoriesRouter);
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quickmart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serves files from uploads folder

// Use routes
app.use('/api', userRoutes); // User authentication routes
app.use('/api/products', productRoutes); // Product routes


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
