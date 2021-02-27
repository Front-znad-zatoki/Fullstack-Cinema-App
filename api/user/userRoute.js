import express from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from 'config';
import { check, validationResult } from 'express-validator';
import User from './User.js';
import loginMiddleware from '../authentication/authenticationMiddleware.js';
const router = express.Router();

// @route POST api/users
// @description Registering new user
// @access public (anybody can register)
router.post(
  '/signUp',
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

// @route GET api/users/me
// @description Get details of current user
// @access private (anybody can register)
router.get('/me', loginMiddleware, async (req, res) => {
  try {
    const userProfile = await User.findOne({
      user: req.user.id,
    }).select('name', 'email', 'phone', 'tickets', 'reservations');

    if (!userProfile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user' });
    }
    console.log('got user');
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
