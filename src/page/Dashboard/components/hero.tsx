import React from "react";
import { motion } from "framer-motion";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Link } from "react-router-dom";
import Bike from "../../../assets/images/leaves.png"; // Update path
import HeroBg from "../../../assets/images/heroo.png"; // Update path
import "./hero.css"; // Ensure this file is imported

const Hero = () => {
  return (
    <motion.main
      className="hero-main"
      initial={{ opacity: 0, x: "100vw" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "spring", stiffness: 220, duration: 0.5 }}
    >
      <div className="hero-column">
        <span className="name">MyFoodApp</span>
        <motion.p
          className="hero-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Treat Yourself to a{" "}
          <span className="text-red-500">Delicious Meal </span>Today, Savor the
          Flavor
        </motion.p>

        <p className="hero-description">
          Restaurant style Yogurt Mint Sauce is a delicious dip that is quick
          and easy to make. This is a standard Indian mint chutney served with
          poppadums along with mint and lemon. We provide pleasure to your
          tastebuds 😉..
        </p>

        <div className="hero-actions">
          <motion.a
            whileHover={{ scale: 0.9 }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            className="hero-button"
            href="#popular"
          >
            Order Now
          </motion.a>
        </div>
      </div>

      {/* Column 2 for medium and large screens */}
      <div className="hero-image-wrapper">
        <img src={HeroBg} alt="Hero-bg" />
      </div>
    </motion.main>
  );
};

export default Hero;
