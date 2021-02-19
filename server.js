const express = require('express');
const mongoose = require('mongoose');
// const connectDB = require('./config/db');

const app = express();

app.get('/', (req, res) => res.send('API Runnin'));

// Connect Database
// connectDB();

// Init Middleware
app.use(express.json());

// Define Routes

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   console.log('production');
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
