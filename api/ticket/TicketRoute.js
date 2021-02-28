import express from 'express';
import Ticket from './Ticket.js';
import Screening from '../screening/Screening.js';
import Order from '../order/Order.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    // TODO: add error handling
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  })
  .post(async (req, res) => {
    const { screeningId, row, column, orderId } = req.body;
    const screening = await Screening.findById(screeningId);
    const order = await Order.findById(orderId);
    if (screening === undefined) {
      res.status(400).json({
        error: `Cannot find screening with id: ${req.params.id}'`,
      });
      return;
    }
    if (order === undefined) {
      res.status(400).json({
        error: `Cannot find order with id: ${req.params.id}'`,
      });
      return;
    }

    const ticket = new Ticket({
      screening: screeningId,
      row,
      column,
      order: orderId,
    });
    await ticket.save();
    res.status(200).json({ message: ticket.id });
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket === undefined) {
      res.status(404).json({
        error: `Cannot find ticket with id: ${req.params.id}`,
      });
      return;
    }
    res.status(200).json(ticket);
  })
  .put(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket === undefined) {
      res.status(404).json({
        error: `Cannot find ticket with id: ${req.params.id}'`,
      });
      return;
    }
    if (req.body.screeningId !== undefined) {
      const screening = await Screening.findById(screeningId);
      if (screening === undefined) {
        res.status(400).json({
          error: `Cannot find screening with id: ${req.params.id}'`,
        });
        return;
      }
      ticket.screening = req.body.screeningId;
    }
    if (req.body.row !== undefined) {
      ticket.row = req.body.row;
    }
    if (req.body.column !== undefined) {
      ticket.column = req.body.column;
    }
    if (req.body.orderId !== undefined) {
      const order = await Order.findById(orderId);
      if (order === undefined) {
        res.status(400).json({
          error: `Cannot find order with id: ${req.params.id}'`,
        });
        return;
      }
      ticket.order = req.body.orderId;
    }
    await ticket.save();
    res
      .status(200)
      .json({ message: 'Ticket updated successfully', ticket });
  })
  .delete(async (req, res) => {
    const ticket = await Ticket.findByIdAndRemove(req.params.id);
    if (screening === undefined) {
      res.status(404).json({
        error: `Cannot find ticket with id: ${req.params.id}'`,
      });
      return;
    }
    res.status(204).json(ticket);
  });

export default router;
