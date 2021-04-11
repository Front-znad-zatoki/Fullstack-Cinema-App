import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../context/Movies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMovies } from '../../actions/Movies';
import './style.scss';

function MovieSlider() {
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
    getMovies(setMovies);
  }, []);
  useEffect(() => {
    getIncomingMovies(movies);
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

  return (
    <div className="slider">
      <h2>Coming up</h2>
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
