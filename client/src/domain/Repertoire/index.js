import screenigns from '../../mock/screeningsMock';
import MovieInfoBar from '../MovieInfoBar';

function Repertoire() {
  // TODO: add reservation and movies context

  return (
    <div>
      Rendering Repertoire
      <ul>
        <li>Repertoire navbar: cinema, date picker, search</li>
        <li>
          MovieInfoBar with poster, data and screening hours as button to
          proceed with reservagtion
        </li>
        <li>MOCK</li>
        {screenigns.map((screening) => {
          return <MovieInfoBar screening={screening} key={screening.id} />;
        })}
      </ul>
    </div>
  );
}

export default Repertoire;
