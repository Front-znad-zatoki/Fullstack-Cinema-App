import express from 'express';
import movieRoute from '../api/movie/movieRoute.js';

const app = express();

// Init Middleware (not body-parser anymore)
app.use(express.json());

// Define Routes
app.use('/api/movies', movieRoute);

export default app;
