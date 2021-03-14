import express from 'express';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import validateObjectId from '../utils/validateObjectId.js';
import Order from '../order/Order.js';
import Seat from '../seat/Seat.js';
import Screening from '../screening/Screening.js';
import transporter from '../../mail/transporter.js';
import getMailOptions from '../../mail/mailOptions.js';

const router = express.Router();

// @route    GET api/users/me/orders
// @desc     get orders
// @access   Private
// TODO: check after orders merged
router.get(
  '/',
  authMiddleware,
  check('order', 'Something wrong with the order')
    .notEmpty()
    .isArray(),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('orders');
      if (!user) res.status(404).send('User not found');
      res
        .status(200)
        .json({ orders: user.orders, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    GET api/users/me/orders/:orderId
// @desc     get orders
// @access   Private
// TODO: check after orders merged
router.get(
  '/:orderId',
  authMiddleware,
  check('order', 'Something wrong with the order').notEmpty(),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { orders } = user;
      const order = await Order.findById(req.params.orderId).populate(
        'ticket',
      );
      const orderIds = orders.map((orderData) => orderData.id);
      const isUsersOrder = orderIds.includes(req.params.orderId);

      if (!user) return res.status(404).send('User not found');
      if (!order) return res.status(404).send('Order not found');
      if (!isUsersOrder) return res.status(404).send('Access denied');

      res.status(200).json({ order: order, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    DELETE api/users/me/orders/:id
// @desc     Delete order
// @access   Private
// TODO: check after orders merged, connect with orders
router.delete('/:id', authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = await Order.findById(req.params.id)
      .populate('tickets')
      .exec();
    if (!order) return res.status(404).send('Order not found');
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        orders: {
          _id: req.params.id,
        },
      },
    }).select('orders email');
    const userOrders = user.orders;
    if (
      !userOrders.some((orderItem) => orderItem.id === req.params.id)
    ) {
      return res.status(404).send('Order not found');
    }
    if (!user) return res.status(404).send('User not found');
    await user.save();
    await order.remove();

    const emailOptions = getMailOptions(
      user.email,
      'Order Deleted',
      `Your order number: ${order.id} was successfully deleted`,
    );
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    res.status(200).json({
      deletedOrder: order,
      isAuthenticated: true,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/me/orders/
// @desc     Add new order
// @access   Private
// @example req.body:
// @{
// @  "status": "pending",
// @  "tickets": [[0,0],[1,0]],
// @  "screening": "604cd23fc5d64540d07eaece"
// @}
router.post(
  '/',
  authMiddleware,
  check('status', 'Status is required').trim().notEmpty().isString(),
  check('screening', 'Screening is required')
    .trim()
    .notEmpty()
    .isString(),
  check('tickets', 'Ticket is required').notEmpty().isArray(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        '-password',
      );
      if (!user) return res.status(404).send('User not found');
      const { tickets, screening } = req.body;

      const screeningToUpdate = await Screening.findById(screening)
        .select('tickets cinemaHall')
        .populate({ path: 'cinemaHall' })
        .populate({
          path: 'tickets',
          populate: {
            path: 'seat',
            model: 'Seat',
          },
        });
      if (!screeningToUpdate) {
        return res.status(404).send('Screening not found');
      }
      const occupiedSeats = screeningToUpdate.tickets.map(
        (ticket) => [ticket.seat.row, ticket.seat.column],
      );
      // eslint-disable-next-line arrow-body-style
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
      const areEmpty = tickets.every(
        (ticket) => !isSpaceOccupied(ticket),
      );
      if (!areEmpty) {
        return res.status(404).send('Seats are not empty');
      }
      const seats = await Promise.all(
        tickets.map(([rowNr, columnNr]) => {
          const seat = Seat.findOne({
            hall: screeningToUpdate.cinemaHall.id,
            row: rowNr,
            column: columnNr,
          });
          return seat;
        }),
      );
      if (!seats) {
        return res.status(404).send('Seats not found');
      }
      const order = new Order({
        user: req.user.id,
        email: user.email,
        status: req.body.status,
      });
      const ticketsIds = await order.createOrdersDependencies(
        seats,
        screening,
        order,
        (err) => {
          if (err) {
            return res.status(400).json({
              msg: 'Can not generate tickets for this order',
            });
          }
        },
      );
      ticketsIds.forEach((ticketId) => {
        screeningToUpdate.tickets.push(ticketId);
        order.tickets.push(ticketId);
      });
      await screeningToUpdate.save();
      await order.save();
      user.orders.push(order);
      await user.save();
      const emailOptions = getMailOptions(
        user.email,
        'Order Placed',
        `Your order number: ${order.id} was successfully placed`,
      );
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      res.status(200).json({ order: order, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
