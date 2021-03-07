import React from 'react';
import Slider from 'react-slick';
import poster1 from '../../assets/moviePosters/adamsApples.jpg';
import poster2 from '../../assets/moviePosters/avatar.jpg';
import poster3 from '../../assets/moviePosters/noTimeToDiePoster.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MovieSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const posters = [poster1, poster2, poster3];
  return (
    <div className="slider">
      <h2>Coming up</h2>

      <Slider {...settings}>
        {posters.map((poster) => {
          console.log(poster);
          return (
            <div key={poster} className="slider_container">
              <img className="slider_container_img" src={poster} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default MovieSlider;
