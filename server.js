import express from 'express';
import connectDB from './config/mongodb.js';
import userRoute from './api/user/userRoute.js';
import loginRoute from './api/authentication/authenticationRoute.js';
import movieRoute from './api/movie/movieRoute.js';
const app = express();

app.get('/', (req, res) => res.send('API Runnin'));

// Connect Database
connectDB();

// Init Middleware (not body-parser anymore)
app.use(express.json());

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/login', loginRoute);
// app.use('/cinemas', require('./api/cinema/cinemaRoute'));
// app.use('/cinemaHalls', require('./api/cinemaHall/cinemaHallRoute'));
app.use('/api/movies', movieRoute);
// app.use('/orders', require('./api/order/orderRoute'));
// app.use('/screenings', require('./api/screening/ScreeningRoute'));
// app.use('/tickets', require('./api/ticket/TicketRoute'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   console.log('production');
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
