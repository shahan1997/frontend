import React from "react";
import CallIcon from "@mui/icons-material/Call";
import "./contactUs.css";
import ReservationForm from "./reservationForm";

const Reservation = () => {
  return (
    <div className="reservation-container">
      {/* Overlay */}
      <div className="reservation-overlay"></div>

      <div className="reservation-content">
        {/* Text Content */}
        <div className="reservation-text">
          <h1>DO YOU HAVE ANY PLAN TODAY? RESERVE YOUR TABLE</h1>
          <p>
            Enjoy a delightful dining experience tonight! Reserve your table now
            to savor exquisite dishes, exceptional service, and an unforgettable
            atmosphere with friends and family.
          </p>

          <div className="reservation-contact">
            <div className="reservation-icon">
              <CallIcon />
            </div>
            <div className="reservation-contact-info">
              <h1>24/7 Available</h1>
              <h1 className="phone-number">0750866441</h1>
            </div>
          </div>
        </div>

        <ReservationForm />
      </div>
    </div>
  );
};

export default Reservation;
