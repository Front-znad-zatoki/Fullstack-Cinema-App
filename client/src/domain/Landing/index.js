import Navbar from '../../components/Navbar';
import MovieSlider from '../MovieSlider';
import './style.scss';

function Landing() {
  return (
    <div className="landing">
      Rendering Landing Page
      <Navbar />
      <MovieSlider />
    </div>
  );
}

export default Landing;
