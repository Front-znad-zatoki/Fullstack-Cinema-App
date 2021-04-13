import express from 'express';
import { check, validationResult } from 'express-validator';
import Order from './Order.js';
import User from '../user/User.js';
import Ticket from '../ticket/Ticket.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';
import orderMiddleware from './orderMiddleware.js';
import Seat from '../seat/Seat.js';
import Screening from '../screening/Screening.js';
import sendEmail from '../../mail/sendEmail.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/orders
  // @description Get all orders
  // @access admin
  .get(authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route POST api/orders
  // @description Create an order
  // @access public
  // @example req.body:
  // @{
  // @  "status": "pending",
  // @ "tickets": [{seatNr:[0,0], price: 'PRICE_REDUCED'},{seatNr:[0,1], price: 'PRICE_REDUCED'}]
  // @  "screening": "604cd23fc5d64540d07eaece"
  // @}
  .post(
    orderMiddleware,
    check('status', 'Status is required')
      .trim()
      .notEmpty()
      .isString(),
    check('screening', 'Screening is required')
      .trim()
      .notEmpty()
      .isString(),
    check('email', 'Please include a valid email')
      .isEmail()
      .trim()
      .isLength({ max: 255 })
      .normalizeEmail(),
    check('ticketsData', 'Tickets Data is required')
      .notEmpty()
      .isArray(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { email, status, ticketsData, screening } = req.body;
        const tickets = ticketsData.map((ticket) => ticket.seatNr);
        const ticketsPrices = ticketsData.map(
          (ticket) => ticket.price,
        );
        const { isAuthenticated, user } = req;
        const userPlacingOrder = isAuthenticated
          ? await User.findById(user.id).select('email orders')
          : undefined;
        // Get screening for which the order was placed
        const screeningChosen = await Screening.findById(screening)
          .select('cinemaHallId')
          .populate({ path: 'cinemaHallId' });
        // If the screening doesn't exist send 404
        if (!screeningChosen) {
          return res.status(404).send('Screening not found');
        }
        // Get tickets that exist for this screening
        const existingTickets = await Ticket.find({
          screening: screeningChosen.id,
        }).populate({
          path: 'seat',
          model: 'Seat',
        });
        // Prepare seats tuples that are occupied
        const occupiedSeats = existingTickets.map(({ seat }) => [
          seat.row,
          seat.column,
        ]);
        // Check if any of the seats that the order is placed for is occupied
        // Define function to check if space is occupied
        const isSpaceOccupied = ([row, column]) => {
          if (occupiedSeats.length === 0) return false;
          return occupiedSeats.some(
            ([occupiedSeatRow, occupiedSeatColumn]) => {
              let result = false;
              if (
                // eslint-disable-next-line operator-linebreak
                occupiedSeatRow === row &&
                occupiedSeatColumn === column
              ) {
                result = true;
              }
              return result;
            },
          );
        };
        // Create a variable that holds the information if seats are empty
        const areEmpty = tickets.every(
          (ticket) => !isSpaceOccupied(ticket),
        );
        if (!areEmpty) {
          return res.status(404).send('Seats are not empty');
        }
        // Check if seats exist and create tuples for further tickets creation
        const seats = await Promise.all(
          tickets.map(([rowNr, columnNr]) => {
            const seat = Seat.findOne({
              hallId: screeningChosen.cinemaHallId.id,
              row: rowNr,
              column: columnNr,
            });
            if (!seat) {
              return res.status(404).send('Seat not found');
            }
            return seat;
          }),
        );
        if (!seats) {
          return res.status(404).send('Seats not found');
        }
        // If all data is ok, create order
        const order = new Order({
          email,
          status,
        });
        if (isAuthenticated) {
          order.user = user.id;
        }
        // Generate all tickets and their ids
        const ticketsIds = await order.createOrdersDependencies(
          seats,
          screening,
          order,
          ticketsPrices,
          (err) => {
            if (err) {
              console.log(err.msg);
              return res.status(400).json({
                msg: 'Can not generate tickets for this order',
              });
            }
          },
        );
        // Add ticket ids as reference to the order
        ticketsIds.forEach((ticketId) => {
          order.tickets.push(ticketId);
        });
        // Save order in mongo db and update users orders if user is authenticated
        await order.save();
        if (userPlacingOrder) {
          userPlacingOrder.orders.push(order.id);
          await userPlacingOrder.save();
        }

        // Send email with notifications
        sendEmail(email, order.id, 'placed');

        res.status(200).json({ msg: 'POSTED', order: order });
      } catch (e) {
        console.error(e.message);
        res.status(400).send({ msg: 'Error placing order' });
      }
    },
  );

router
  .route('/:id')
  // @route GET api/orders/id
  // @description Get an order
  // @access admin
  .get(authMiddleware, adminMiddleware, async (req, res) => {
    const order = await Order.findById(req.params.id);
    try {
      if (order === undefined) {
        res.status(404).json({
          error: `Cannot find order with id: ${req.params.id}`,
        });
        return;
      }
      res.status(200).json(order);
    } catch (e) {
      res.status(400).send(e);
    }
  })

  // @route DELETE api/orders/id
  // @description Delete an order
  // @access admin
  .delete(authMiddleware, adminMiddleware, async (req, res) => {
    try {
      // Find order and delete
      // Tickets are removed automatically by orderSchema.post('remove')
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({
          error: `Cannot find order with id: ${req.params.id}'`,
        });
      }

      // Get email of the client and send notification
      const { email } = order;
      sendEmail(email, order.id, 'deleted');

      // Remove order from users order if user exists
      const userId = order.user;
      if (userId) {
        const user = await User.findByIdAndUpdate(userId, {
          $pull: {
            orders: {
              _id: req.params.id,
            },
          },
        });
        await user.save();
      }

      res.status(200).json({ msg: 'Order deleted', order: order });
    } catch (e) {
      res.status(400).send(e);
    }
  });

export default router;
