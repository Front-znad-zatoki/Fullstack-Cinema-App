import mongoose from 'mongoose';
import Screening from '../screening/Screening.js';
import Seat from '../seat/Seat.js';
import Ticket from '../ticket/Ticket.js';
import validateEmail from '../utils/validateEmail.js';

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'invalid email'],
    match: [
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i,
      'Please fill a valid email address',
    ],
  },
  status: String,
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  ],

  // TODO: prepare enum for that field
  // TODO: add tickets array here?
});

orderSchema.methods.createOrdersDependencies = async function createOrdersDependencies(
  seats,
  screening,
  order,
  cb,
) {
  try {
    const promises = seats.map((ticketToCreate) => {
      const newTicket = new Ticket({
        seat: ticketToCreate.id,
        order: order.id,
        screening: screening,
      });
      return newTicket.save();
    });
    const promisesResolved = await Promise.all(promises);
    const arrayOfTicketIds = promisesResolved.map((prom) => prom.id);
    return arrayOfTicketIds;
  } catch (err) {
    return cb(err);
  }
};

orderSchema.post('save', (doc) => {
  // console.log(doc);
  console.log('post save');
});

orderSchema.post(
  'remove',
  { query: true, document: true },
  async (doc) => {
    try {
      console.log('ordered tickets were: ', doc.tickets);
      const [ticketsToRemove, screeningToUpdate] = doc.tickets.reduce(
        (acc, cur) => {
          acc[0].push(cur.id);
          console.log(typeof cur.id);
          console.log(typeof cur.screening);
          if (!acc[1].includes(cur.screening)) {
            acc[1].push(cur.screening);
          }
          return acc;
        },
        [[], []],
      );
      console.log(ticketsToRemove);
      console.log(screeningToUpdate);
      const tickets = await Ticket.deleteMany({
        _id: {
          $in: ticketsToRemove,
        },
      });
      console.log('Deleted tickets number: ', tickets.deletedCount);

      const screening = await Screening.findByIdAndUpdate(
        screeningToUpdate[0],
        {
          $pull: {
            tickets: {
              $in: ticketsToRemove,
            },
          },
        },
      );
      console.log(screening);
      await screening.save();
      console.log('post remove');
    } catch (err) {
      console.log(err);
    }
  },
);

export default mongoose.model('Order', orderSchema);
