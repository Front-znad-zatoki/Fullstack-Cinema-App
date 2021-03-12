import express from 'express';
import Order from './Order.js';
import User from '../user/User.js';
import Ticket from '../ticket/Ticket.js';
import authMiddleware from '../authentication/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .post(authMiddleware, async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { userId, email, status, tickets } = req.body;
    try {
      const user = await User.findById(userId);
      if (user === undefined) {
        res.status(404).json({
          error: `Cannot find user with id: ${req.params.id}'`,
        });
        return;
      }
      const order = new Order({
        user: userId,
        email,
        status,
      });
      await order.save();
      tickets.forEach(async (ticket) => {
        const newTicket = new Ticket({
          screening: ticket.screeningId,
          row: ticket.row,
          column: ticket.column,
          order: order.id,
        });
        await newTicket.save();
        return ticket.id;
      });
      await order.save();
      res.status(200).json({ message: order.id });
    } catch (e) {
      res.status(400).send(e);
    }
  });

router
  .route('/:id')
  .get(authMiddleware, async (req, res) => {
    // TODO: for admin and user who purchased only? to change for all not public routes
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
  .put(authMiddleware, async (req, res) => {
    const { userId, email, status } = req.body;
    const order = await Order.findById(req.params.id);
    try {
      if (order === undefined) {
        res.status(404).json({
          error: `Cannot find order with id: ${req.params.id}'`,
        });
        return;
      }
      if (userId !== undefined) {
        const user = await User.findById(userId);
        if (user === undefined) {
          res.status(400).json({
            error: `Cannot find user with id: ${req.params.id}'`,
          });
          return;
        }
        order.user = userId;
      }
      if (email !== undefined) {
        order.email = email;
      }
      if (status !== undefined) {
        order.status = status;
      }
      await order.save();
      res
        .status(200)
        .json({ message: 'Order updated successfully', order });
    } catch (e) {
      res.status(400).send(e);
    }
  })
  .delete(authMiddleware, async (req, res) => {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    try {
      if (ticket === undefined) {
        res.status(404).json({
          error: `Cannot find ticket with id: ${req.params.id}'`,
        });
        return;
      }
      res.status(204).json(ticket);
    } catch (e) {
      res.status(400).send(e);
    }
  });

export default router;
