import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongodb.js';
import userRoute from './api/user/userRoute.js';
import movieRoute from './api/movie/movieRoute.js';
import orderRoute from './api/order/orderRoute.js';
import screeningRoute from './api/screening/screeningRoute.js';
import ticketRoute from './api/ticket/ticketRoute.js';
import cinemaRoute from './api/cinema/cinemaRoute.js';
import cinemaHallRoute from './api/cinemaHall/cinemaHallRoute.js';
import seatRoute from './api/seat/seatRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.get('/', (req, res) => res.send('API Runnin'));

// Connect Database
connectDB();

// Cookies handling
app.use(cookieParser());
// Init Middleware (not body-parser anymore)
app.use(express.json());

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/orders', orderRoute);
app.use('/api/screenings', screeningRoute);
app.use('/api/tickets', ticketRoute);
app.use('/api/cinemas', cinemaRoute);
app.use('/api/cinemaHalls', cinemaHallRoute);
app.use('/api/seats', seatRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html'),
    );
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
