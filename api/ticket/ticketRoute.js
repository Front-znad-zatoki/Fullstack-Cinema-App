import express from 'express';
import Ticket from './Ticket.js';
import Screening from '../screening/Screening.js';
import Order from '../order/Order.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';

const router = express.Router();

router
  .route('/')
  // @route GET api/tickets
  // @description Get all tickets
  // @access public
  .get(async (req, res) => {
    try {
      const tickets = await Ticket.find({});
      res.status(200).json(tickets);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route POST api/tickets
  // @description Create a ticket
  // @access admin
  .post(authMiddleware, adminMiddleware, async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { screeningId, row, column, orderId } = req.body;
    try {
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
    } catch (e) {
      res.status(400).send(e);
    }
  });

router
  .route('/:id')
  // @route GET api/tickets/id
  // @description Get a ticket
  // @access user
  .get(authMiddleware, async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    try {
      if (ticket === undefined) {
        res.status(404).json({
          error: `Cannot find ticket with id: ${req.params.id}`,
        });
        return;
      }
      res.status(200).json(ticket);
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route PUT api/tickets/id
  // @description Update a ticket
  // @access admin
  .put(authMiddleware, adminMiddleware, async (req, res) => {
    const { screeningId, orderId } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    try {
      if (ticket === undefined) {
        res.status(404).json({
          error: `Cannot find ticket with id: ${req.params.id}'`,
        });
        return;
      }
      if (screeningId !== undefined) {
        const screening = await Screening.findById(screeningId);
        if (screening === undefined) {
          res.status(400).json({
            error: `Cannot find screening with id: ${req.params.id}'`,
          });
          return;
        }
        ticket.screening = screeningId;
      }
      if (req.body.row !== undefined) {
        ticket.row = req.body.row;
      }
      if (req.body.column !== undefined) {
        ticket.column = req.body.column;
      }
      if (orderId !== undefined) {
        const order = await Order.findById(orderId);
        if (order === undefined) {
          res.status(400).json({
            error: `Cannot find order with id: ${req.params.id}'`,
          });
          return;
        }
        ticket.order = orderId;
      }
      await ticket.save();
      res
        .status(200)
        .json({ message: 'Ticket updated successfully', ticket });
    } catch (e) {
      res.status(400).send(e);
    }
  })
  // @route DELETE api/tickets/id
  // @description Delete a ticket
  // @access admin
  .delete(authMiddleware, adminMiddleware, async (req, res) => {
    const ticket = await Ticket.findByIdAndRemove(req.params.id);
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
