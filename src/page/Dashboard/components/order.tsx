import { motion } from "framer-motion";
import order from "../../../assets/images/order.svg";
import cart from "../../../assets/images/cart.svg";

import search from "../../../assets/images/search.svg";

import checkout from "../../../assets/images/checkout.svg";

import "./order.css";

const Order = () => {
  return (
    <div className="containerOrder">
      <div className="containerOrder-header">
        <p>How to order?</p>
        <h2>Follow the steps</h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0 }}
        className="steps-grid"
      >
        <div className="step">
          <img src={search} alt="search" className="step-image" />
          <span className="step-number">01</span>
          <p className="step-text">Search For Meal</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          exit={{ opacity: 0 }}
          className="step"
        >
          <img src={cart} alt="cart" className="step-image" />
          <span className="step-number">02</span>
          <p className="step-text">Add to Cart</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2 }}
          exit={{ opacity: 0 }}
          className="step"
        >
          <img src={order} alt="checkout" className="step-image" />
          <span className="step-number">03</span>
          <p className="step-text">Proceed to Checkout</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 3 }}
          exit={{ opacity: 0 }}
          className="step"
        >
          <img src={checkout} alt="payment" className="step-image" />
          <span className="step-number">04</span>
          <p className="step-text">Make Payment</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Order;
