import express from 'express';
import Order from './Order.js';
import User from '../user/User.js';
import Ticket from '../ticket/Ticket.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    const orders = await Order.find({});
    res.status(200).json(orders);
  })
  .post(async (req, res) => {
    const { userId, email, status, tickets } = req.body;
    const user = await User.findById(userId);
    if (user === undefined) {
      res.status(400).json({
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
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order === undefined) {
      res.status(404).json({
        error: `Cannot find order with id: ${req.params.id}`,
      });
      return;
    }
    res.status(200).json(order);
  })
  .put(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order === undefined) {
      res.status(404).json({
        error: `Cannot find order with id: ${req.params.id}'`,
      });
      return;
    }
    if (req.body.userId !== undefined) {
      const user = await User.findById(userId);
      if (user === undefined) {
        res.status(400).json({
          error: `Cannot find user with id: ${req.params.id}'`,
        });
        return;
      }
      order.user = req.body.userId;
    }
    if (req.body.email !== undefined) {
      order.email = req.body.email;
    }
    if (req.body.status !== undefined) {
      order.status = req.body.status;
    }
    await ticket.save();
    res
      .status(200)
      .json({ message: 'Order updated successfully', order });
  })
  .delete(async (req, res) => {
    const ticket = await Ticket.findByIdAndRemove(req.params.id);
    if (ticket === undefined) {
      res.status(404).json({
        error: `Cannot find ticket with id: ${req.params.id}'`,
      });
      return;
    }
    res.status(204).json(ticket);
  });

export default router;
