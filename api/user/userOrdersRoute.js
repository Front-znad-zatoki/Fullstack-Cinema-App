import express from 'express';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';

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
      res.status(200).json(user.orders);
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
      const order = user
        .find({
          orders: {
            order: req.params.orderId,
          },
        })
        .populate('order');
      if (!user) res.status(404).send('User not found');
      if (!order) res.status(404).send('Order not found');
      res.status(200).json(order);
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
  '/:orderId',
  authMiddleware,
  check('order', 'Something wrong with the order').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        $pull: {
          orders: {
            order: req.params.orderId,
          },
        },
      }).select('orders');
      if (!user) res.status(404).send('User not found');
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  },
);

export default router;
