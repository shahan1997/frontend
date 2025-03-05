import pizza from "../../../assets/images/pizza-banner.png";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { motion } from "framer-motion"; // Import framer-motion
import React from "react";
import "./delivery.css"; // Import CSS module

const Delivery = () => {
  return (
    <div className="deliverySection">
      <div className="container">
        {/* Image with Framer Motion Animation triggered when it comes into view */}
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Initial state: hidden and positioned left
          whileInView={{ opacity: 1, x: 0 }} // Trigger animation when in view
          transition={{ duration: 1 }} // Animation duration
        >
          <img
            src={require("../../../assets/images/delivery.svg").default}
            alt="delivery"
            className="image"
          />
        </motion.div>

        {/* Text Content */}
        <div className="textContent">
          <h1 className="textContentHead">
            Your <span className="highlight">Favorite Meal</span> On the Way
          </h1>
          <p className="description">
            Explore a world of mouth-watering dishes, prepared with the finest
            ingredients and delivered straight to your doorstep for a truly
            unforgettable dining experience.
          </p>

          <div className="info">
            <DeliveryDiningIcon className="icon" />
            <h2>Delivery in 30 minutes</h2>
          </div>

          <div className="info">
            <DeliveryDiningIcon className="icon" />
            <h2>Free shipping from $75</h2>
          </div>

          <div className="info">
            <DeliveryDiningIcon className="icon" />
            <h2>Delivery on your Doorstep</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
