import express from 'express';
import connectDB from './config/mongodb.js';
import userRoute from './api/user/userRoute.js';
import authRoute from './api/authentication/authRoute.js';
import movieRoute from './api/movie/movieRoute.js';
import orderRoute from './api/order/orderRoute.js';
import screeningRoute from './api/screening/screeningRoute.js';
import ticketRoute from './api/ticket/ticketRoute.js';
import cinemaRoute from './api/cinema/cinemaRoute.js';
import cinemaHallRoute from './api/cinemaHall/cinemaHallRoute.js';

const app = express();

app.get('/', (req, res) => res.send('API Runnin'));

// Connect Database
connectDB();

// Init Middleware (not body-parser anymore)
app.use(express.json());

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/orders', orderRoute);

app.use('/api/screenings', screeningRoute);
app.use('/api/tickets', ticketRoute);
app.use('/api/cinemas', cinemaRoute);
app.use('/api/cinemaHalls', cinemaHallRoute);

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   console.log('production');
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
