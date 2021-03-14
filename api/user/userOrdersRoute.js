import express from 'express';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import validateObjectId from '../utils/validateObjectId.js';
import Order from '../order/Order.js';
import Seat from '../seat/Seat.js';
import Screening from '../screening/Screening.js';

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
router.delete(
  '/',
  authMiddleware,
  check('orderId', 'Something wrong with the order').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const order = await Order.findById(req.body.orderId)
        .populate()
        .exec();
      if (!order) return res.status(404).send('Order not found');
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          orders: {
            _id: req.body.orderId,
          },
        },
      }).select('orders');
      const userOrders = user.orders;
      if (
        !userOrders.some(
          (orderItem) => orderItem.id === req.body.orderId,
        )
      ) {
        return res.status(404).send('Order not found');
      }
      if (!user) return res.status(404).send('User not found');
      await user.save();
      await order.remove();
      res.status(200).json({
        deletedOrder: order,
        isAuthenticated: true,
      });
    } catch (err) {
      res.status(500).send('Server Error');
    }
  },
);

// @route    POST api/users/me/orders/
// @desc     Add new order
// @access   Private
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
        .select('tickets')
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
        (ticket) => ticket.seat.name,
      );
      const areEmpty = tickets.every(
        (ticket) => !occupiedSeats.includes(ticket),
      );
      if (!areEmpty) {
        return res.status(404).send('Seats are not empty');
      }
      const seats = await Seat.find({
        name: { $in: tickets },
      });
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
      res.status(200).json({ order: order, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/users/me/orders/
// @desc     Update order
// @access   Private
router.put('/', authMiddleware, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  // TODO: add validation
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).send('User not found');

    const order = await Order.findById(req.body.orderId);
    if (!order) return res.status(404).send('Order not found');

    const userOrders = user.orders;
    if (
      !userOrders.some(
        (orderItem) => orderItem.id === req.body.orderId,
      )
    ) {
      return res.status(404).send('Order not found');
    }

    if (req.body.tickets) {
      order.tickets = req.body.tickets;
    }
    if (req.body.status) {
      order.status = req.body.status;
    }

    await order.save();
    res.status(200).json({
      message: 'Order updated successfully',
      order: order,
      isAuthenticated: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
