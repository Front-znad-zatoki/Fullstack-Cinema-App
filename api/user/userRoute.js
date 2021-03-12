import express from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';
import userMeRoute from './userMeRoute.js';

const router = express.Router();

router.use('/me', userMeRoute);

// @route POST api/users
// @description Registering new user
// @access public (anybody can register)
router.post(
  '/signup',
  check('name', 'Name is required of 5 or more characters')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 5, max: 50 }),
  check('surname', 'Surname is required of 5 or more characters')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 5, max: 50 }),
  check('email', 'Please include a valid email')
    .isEmail()
    .trim()
    .isLength({ max: 255 })
    .normalizeEmail(),
  check(
    'password',
    'Please enter a password with 5 or more characters',
  )
    .trim()
    .isLength({ min: 5, max: 255 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password, isAdmin } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        surname,
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
          res
            .cookie('access_token', token, {
              httpOnly: true,
              sameSite: true,
            })
            .json({
              isAuthenticated: true,
              user: { id: user.id, isAdmin: user.isAdmin },
            })
            .status(200);
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

// @route    POST api/users/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      jsonwebtoken.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '36000' },
        (err, token) => {
          if (err) throw err;
          res
            .cookie('access_token', token, {
              httpOnly: true,
              sameSite: true,
            })
            .json({
              isAuthenticated: true,
              user: { id: user.id, isAdmin: user.isAdmin },
            })
            .status(200);
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

// @route GET api/users/logout
// @description Logging out user
// @access public (anybody can log out)
router.get('/logout', async (req, res) => {
  try {
    if (!req.cookies.access_token) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No cookies to clear' }] });
    }
    res
      .clearCookie('access_token')
      .json({
        msg: 'user logged out',
        user: { id: '', isAdmin: '' },
        success: true,
        isAuthenticated: false,
      })
      .status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/users
// @description Getting all users
// @access admin
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (!users) res.status(404).send('Users not found');
    res.json({ users: users, isAuthenticated: true });
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
      if (!user) res.status(404).send('User not found');
      res.status(200).json({ user: user, isAuthenticated: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
