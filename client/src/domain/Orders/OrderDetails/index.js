import TicketChosen from '../../../components/Ticket/TicketChosen';
import convertRowsAndColumnsToAlphanumeric from '../../../utils/convertRowsAndColumnsToAlhaNumeric';
import OrderDetailsItem from './OrderDetailsItem';
import { formatDateAndTime } from '../../../utils/dateFormatters';

function OrderDetails({ details }) {
  const { status, tickets } = details;
  return (
    <ul className="profile__list-details">
      <OrderDetailsItem
        title="Start date"
        data={`${formatDateAndTime(tickets[0].screening.startDate)}`}
      />
      <OrderDetailsItem title="Status" data={status} />
      <OrderDetailsItem
        title="Screening"
        data={`${tickets[0].screening.movieId.title}`}
      />
      <OrderDetailsItem
        title="Cinema Hall"
        data={tickets[0].screening.cinemaHallId.name}
      />
      <h3 className="dashboard__header">TICKETS:</h3>
      <ul className="profile__ticket__list">
        {tickets.map((ticket) => {
          const seatNr = convertRowsAndColumnsToAlphanumeric(
            ticket.seat.row,
            ticket.seat.column,
          );
          return (
            <TicketChosen
              key={ticket._id}
              price={ticket.screening.price}
              seat={{ seatNr, price: ticket.price }}
            />
          );
        })}
      </ul>
    </ul>
  );
}

export default OrderDetails;
