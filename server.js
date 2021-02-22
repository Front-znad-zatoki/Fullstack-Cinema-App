import express from 'express';
import connectDB from './config/mongodb';

const app = express();

app.get('/', (req, res) => res.send('API Runnin'));

// Connect Database
connectDB();

// Init Middleware (not body-parser anymore)
app.use(express.json());

// Define Routes
app.use('/api/users', require('./api/user/userRoute'));
app.use(
  '/api/login',
  require('./api/authentication/authenticationRoute'),
);
// app.use('/cinemas', require('./api/cinema/cinemaRoute'));
// app.use('/cinemaHalls', require('./api/cinemaHall/cinemaHallRoute'));
// app.use('/movies', require('./api/movie/movieRoute'));
// app.use('/orders', require('./api/order/orderRoute'));
// app.use('/screenings', require('./api/screening/ScreeningRoute'));
// app.use('/tickets', require('./api/ticket/TicketRoute'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   console.log('production');
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
