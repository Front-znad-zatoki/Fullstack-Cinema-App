import express from 'express';
import { check, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import userOrderRoute from './userOrdersRoute.js';

const router = express.Router();
router.use('/orders', userOrderRoute);

// @route    GET api/users/me
// @desc     Get user by token
// @access   Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) res.status(404).res.json({ msg: 'User not found' });
    res.status(200).json({ user: user, isAuthenticated: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/users/me
// @description delete user
// @access private user
router.delete('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id).select(
      '-password',
    );
    if (!user) res.status(404).res.json({ msg: 'User not found' });
    res.status(200).json({ user: user, isAuthenticated: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/users/me/phone
// @desc     Update profile
// @access   Private
router.put(
  '/phone',
  authMiddleware,
  check('phone', 'Insert phone number min 7 digits')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 7, max: 20 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOneAndUpdate(
        req.user.id,
        { phone: req.body.phone },
        { new: true },
      ).select('-password');
      if (!user) res.status(404).send('User not found');
      await user.save();

      res.status(200).json({ user: user, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/users/me/name
// @desc     Update name
// @access   Private
router.put(
  '/name',
  authMiddleware,
  check('name', 'Name is required')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 5, max: 255 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOneAndUpdate(
        req.user.id,
        { name: req.body.name },
        { new: true },
      ).select('-password');
      if (!user) res.status(404).send('User not found');
      await user.save();
      res.status(200).json({ user: user, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/users/me/password
// @desc     Update password
// @access   Private
router.put(
  '/password',
  authMiddleware,
  check('password', 'Password is required')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 5, max: 255 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcryptjs.genSalt(10);
      const password = await bcryptjs.hash(req.body.password, salt);
      const user = await User.findOneAndUpdate(
        req.user.id,
        { password: password },
        { new: true },
      ).select('-password');
      if (!user) res.status(404).send('User not found');
      await user.save();
      res.status(200).json({ user: user, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
