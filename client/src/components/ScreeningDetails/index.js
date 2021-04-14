import './style.scss';

function ScreeningDetails({
  title,
  city,
  country,
  startDateFormatted,
  startTimeFormatted,
}) {
  return (
    <div className="screening__container">
      <div className="screening__container movie__view__details movie__list__item">
        <h3>{title}</h3>
        <p>
          <strong>Cinema:</strong> {city}, {country}
        </p>
        <p>
          <strong>Start Date:</strong>
          {startDateFormatted}, {startTimeFormatted}
        </p>
      </div>
    </div>
  );
}

export default ScreeningDetails;
