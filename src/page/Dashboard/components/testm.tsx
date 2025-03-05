import React from "react";
import networkImg from "../../../assets/images/network.png"; // Adjust the path as needed

import "./testa.css"; // New CSS file for styling
import TestimonialSlider from "./testa";

const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-content">
          <h2 className="testimonial-title">
            What our <span>customers</span> are saying
          </h2>
          <TestimonialSlider />
        </div>
        <div className="testimonial-image">
          <img src={networkImg} alt="testimonial" className="testimonial-img" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
