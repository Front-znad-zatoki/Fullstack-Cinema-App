import mongoose from 'mongoose';
import Ticket from '../ticket/Ticket.js';

const { Schema } = mongoose;

const screeningSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    cinemaHallId: {
      type: Schema.Types.ObjectId,
      ref: 'CinemaHall',
      required: true,
    },
    price: {
      normal: { type: Number, required: true },
      reduced: { type: Number },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

screeningSchema.post(
  'findOneAndDelete',
  { query: true, document: true },
  async (doc) => {
    try {
      await Ticket.deleteMany({ screening: doc.id });
    } catch (err) {
      console.log(err);
    }
  },
);

export default mongoose.model('Screening', screeningSchema);
