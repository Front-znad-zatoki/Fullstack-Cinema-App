import React from 'react';
import Slider from 'react-slick';
import poster1 from "../../moviePosters/Adam's_Apples.jpg";
import poster2 from '../../moviePosters/avatar.jpg';
import poster3 from '../../moviePosters/noTimeToDiePoster.jpg';
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
        {posters.map((poster, i) => {
          console.log(poster);
          return (
            <div key={i} className="slider_container">
              <img className="slider_container_img" src={poster} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default MovieSlider;
