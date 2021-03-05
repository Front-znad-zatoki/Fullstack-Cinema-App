import React from 'react';
import Slider from 'react-slick';
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

  const posters = [
    "./moviePosters/Adam's_Apples.jpg",
    './moviePosters/avatar.jpg',
    './moviePosters/noTimeToDiePoster.jpg',
  ];
  return (
    <div className="App">
      <h2>Coming up</h2>

      <Slider {...settings}>
        {posters.map((poster, i) => {
          console.log(poster);
          return (
            <div key={i} className="img-card">
              <img className="img" src={poster} alt="" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default MovieSlider;
