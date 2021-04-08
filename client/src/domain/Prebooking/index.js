import movies from '../../mock/moviesMock';
import screenigns from '../../mock/screeningsMock';

function PreBooking({ match }) {
  // TODO: add context to retrieve info about screening data

  return <div>Rendering pre booking view of: {match.params.screeningId}</div>;
}

export default PreBooking;
