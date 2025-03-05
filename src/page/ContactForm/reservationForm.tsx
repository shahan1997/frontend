import React from "react";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import "./contactUs.css";

const ReservationForm = () => {
  return (
    <div className="reservation-form">
      <ConnectWithoutContactIcon className="reservation-form-icon" />
      <h1 className="reservation-form-title">Contact US</h1>

      <div className="reservation-form-container">
        <div className="reservation-form-group">
          <label htmlFor="name" className="reservation-form-label">
            Name
          </label>
          <input type="text" id="name" className="reservation-form-input" />

          <label htmlFor="email" className="reservation-form-label">
            Email
          </label>
          <input type="text" id="email" className="reservation-form-input" />

          <label htmlFor="message" className="reservation-form-label">
            Message
          </label>
          <textarea id="message" className="reservation-form-input" />
        </div>

        <div className="reservation-form-button-container">
          <button className="reservation-form-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
