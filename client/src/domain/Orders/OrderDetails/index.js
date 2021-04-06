function OrderDetails({ details }) {
  const { createdAt, status, tickets } = details;
  console.log(tickets);
  // TODO: create details component
  return (
    <ul className="order__details-list">
      <li className="order__details">
        Created At:
        <span className="order__details--bold" />
        {createdAt}
      </li>
      <li className="order__details">
        Status:
        <span className="order__details--bold" />
        {status}
      </li>
      <li className="order__details">
        Screening:
        <span className="order__details--bold" />
        {tickets[0].screening.movieId.title}
      </li>
      <li className="order__details">
        Cinema Hall:
        <span className="order__details--bold" />
        {tickets[0].screening.cinemaHallId.name}
      </li>
      {/* TODO: add tickets render */}
    </ul>
  );
}

export default OrderDetails;
