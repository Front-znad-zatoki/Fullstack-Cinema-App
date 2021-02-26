import express from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';
const router = express.Router();

// @route POST api/users
// @description Registering new user
// @access public (anybody can register)
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 5 or more characters',
  ).isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        isAdmin,
      });

      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      jsonwebtoken.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        },
      );
      // res.status(200).send('User Created!');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

// @route GET api/users
// @description Getting all users
// @access admin
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/users
// @description Delete user by admin
// @access admin
router.delete(
  '/',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.body.id);
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route DELETE api/user
// @description delete user
// @access private user
router.delete('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/user/me/phone
// @desc     Update profile
// @access   Private
router.put(
  '/me/phone',
  authMiddleware,
  check('phone', 'Insert phone number min 7 digits')
    .notEmpty()
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
      );
      if (!user) res.status(404).send('User not found');
      await user.save();

      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/user/me/name
// @desc     Update name
// @access   Private
router.put(
  '/me/name',
  authMiddleware,
  check('name', 'Name is required')
    .notEmpty()
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
      );
      if (!user) res.status(404).send('User not found');
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/user/me/password
// @desc     Update password
// @access   Private
router.put(
  '/me/password',
  authMiddleware,
  check('password', 'Password is required')
    .notEmpty()
    .isLength({ min: 5, max: 255 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOneAndUpdate(
        req.user.id,
        { password: req.body.password },
        { new: true },
      );
      if (!user) res.status(404).send('User not found');
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    PUT api/user/me/reservations
// @desc     Update reservations
// @access   Private
router.put(
  '/me/reservations',
  authMiddleware,
  check('reservations', 'New reservation requires')
    .notEmpty()
    .isArray(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOneAndUpdate(
        req.user.id,
        {
          $push: {
            reservations: req.body.reservationId,
          },
        },
        { new: true, upsert: true },
      );
      if (!user) res.status(404).send('User not found');
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
