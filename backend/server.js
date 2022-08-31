const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// app
const app = express();

app.use(cors());

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cvs', require('./routes/cvRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html');
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to AQP Trucking' });
  });
}

app.use(errorHandler);

// port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
