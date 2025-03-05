import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ava01 from "../../../assets/images/t1.jpg";
import ava02 from "../../../assets/images/t2.jpg";
import ava03 from "../../../assets/images/t3.jpg";

import "./testa.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true, // Ensures height adjusts dynamically
  };

  return (
    <Slider {...settings} className="testa-slider">
      <div className="testa-slide">
        <p className="testa-review__text">
          "Amazing experience! The food was exactly what I was craving, and it
          arrived on time. The quality was excellent, and the portions were
          generous. The entire meal was fresh and flavorful. I'll definitely be
          ordering again soon!"
        </p>
        <div className="testa-slider__content">
          <img src={ava01} alt="avatar" className="testa-avatar" />
          <h6 className="testa-name">Jhon Doe</h6>
        </div>
      </div>
      <div className="testa-slide">
        <p className="testa-review__text">
          "I am so impressed! The food was fresh, flavorful, and perfectly
          cooked. The delivery service was prompt and professional. The
          packaging was eco-friendly, and it made my meal even better. I’ll
          definitely be ordering again soon"
        </p>
        <div className="testa-slider__content">
          <img src={ava02} alt="avatar" className="testa-avatar" />
          <h6 className="testa-name">Mitchell Marsh</h6>
        </div>
      </div>
      <div className="testa-slide">
        <p className="testa-review__text">
          "Satisfying and fresh! I love how quickly my food arrives and how
          delicious every meal is. Highly recommend this site, Fantastic
          experience! The food was hot, flavorful, and arrived promptly.
          Definitely my new go-to for food deliveries.!"
        </p>
        <div className="testa-slider__content">
          <img src={ava03} alt="avatar" className="testa-avatar" />
          <h6 className="testa-name">Steven Crock</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
