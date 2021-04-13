import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../context/Movies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMovies } from '../../actions/Movies';
import './style.scss';
import CustomLoader from '../../components/Loader';

function MovieSlider() {
  const [loading, setLoading] = useState(false);

  const { movies, setMovies } = useContext(MoviesContext);
  const [incomingMovies, setIncomingMovies] = useState();
  const getIncomingMovies = () => {
    const timeNow = new Date();
    const filteredIncomingMovies = movies.filter((movie) => {
      const timeOfRelease = new Date(movie.releaseDate);
      return timeOfRelease.getTime() > timeNow.getTime();
    });
    setIncomingMovies(filteredIncomingMovies);
  };
  useEffect(() => {
    setLoading(true);
    getMovies(setMovies, setLoading);
  }, []);
  useEffect(() => {
    setLoading(true);
    getIncomingMovies(movies);
    setLoading(false);
  }, [movies]);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    adaptiveHeight: false,
    variableWidth: true,
    centerMode: true,
    focusOnSelect: true,
    pauseOnFocus: true,
    pauseOnHover: true,
  };
  if (loading) return <CustomLoader />;

  return (
    <div className="slider">
      <h2>COMING UP</h2>
      <Slider {...settings}>
        {incomingMovies
          ? incomingMovies.map(({ poster, slug, title }, index) => {
              return (
                <Link
                  key={slug}
                  to={`/movies/${slug}`}
                  className="slider_container"
                >
                  <img
                    className="slider_container_img"
                    src={poster}
                    alt={title}
                  />
                </Link>
              );
            })
          : null}
      </Slider>
    </div>
  );
}
export default MovieSlider;
