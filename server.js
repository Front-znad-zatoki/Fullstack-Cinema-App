const express = require('express');
const connectDB = require('./config/mongodb');

const app = express();

app.get('/', (req, res) => res.send('API Runnin'));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./api/user/userRoute'));
// app.use('/api/movies', require('./api/movie/movieRoute'));
// app.use('/api/cinema', require('./api/movie/cinemaRoute'));
//TODO: add more routes

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   console.log('production');
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
