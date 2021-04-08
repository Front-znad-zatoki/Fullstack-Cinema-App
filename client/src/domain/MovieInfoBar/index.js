import { Link, Redirect, useHistory } from 'react-router-dom';
import screenigns from '../../mock/screeningsMock';

const MovieInfoBar = ({ screening }) => {
  const history = useHistory();
  const handleClick = (event) => {
    event.preventDefault();
    history.push(`/prebooking/${screening.id}`);
  };
  return (
    <li key={screening.id}>
      <p>{screening.movieId}</p>
      <button onClick={handleClick}>{screening.startDate}</button>
    </li>
  );
};

export default MovieInfoBar;
