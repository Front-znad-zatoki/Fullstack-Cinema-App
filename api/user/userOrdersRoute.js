import express from 'express';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import Order from '../order/Order.js';
import sendEmail from '../../mail/sendEmail.js';

const router = express.Router();

// @route    GET api/users/me/orders
// @desc     get orders
// @access   Private
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
router.get(
  '/:orderId',
  authMiddleware,
  check('order', 'Something wrong with the order').notEmpty(),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { orders } = user;
      const order = await Order.findById(req.params.orderId).populate(
        {
          path: 'tickets',
          model: 'Ticket',
        },
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
router.delete('/:id', authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if order exists
    const order = await Order.findById(req.params.id)
      .populate('tickets')
      .exec();
    if (!order) return res.status(404).send('Order not found');

    // Check if user exists and remove order from the list of orders
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        orders: {
          _id: req.params.id,
        },
      },
    }).select('orders email');
    const userOrders = user.orders;

    // check if this order belongs to this user
    if (
      !userOrders.some((orderItem) => orderItem.id === req.params.id)
    ) {
      return res.status(404).send('Order not found');
    }
    if (!user) return res.status(404).send('User not found');

    // Save results
    await user.save();
    await order.remove();

    // Send notifications
    sendEmail(user.email, order.id, 'deleted');

    res.status(200).json({
      deletedOrder: order,
      isAuthenticated: true,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
