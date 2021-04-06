import OrderDetailsItem from './OrderDetailsItem';

function OrderDetails({ details }) {
  const { startDate, status, tickets } = details;
  console.log(tickets);
  return (
    <ul className="order__details-list">
      <OrderDetailsItem
        title="Start date"
        data={tickets[0].screening.startDate}
      />
      <OrderDetailsItem title="Status" data={status} />
      <OrderDetailsItem
        title="Screening"
        data={tickets[0].screening.movieId.title}
      />
      <OrderDetailsItem
        title="Cinema Hall"
        data={tickets[0].screening.cinemaHallId.name}
      />
      {/* TODO: add tickets render */}
    </ul>
  );
}

export default OrderDetails;
