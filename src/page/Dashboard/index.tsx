"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { appColors } from "../../theme/appColors";
import ProductCard from "./components/productCard";
import AdsCard from "./components/adsCard";
import { useNavigate } from "react-router-dom";
import { Variants } from "framer-motion";
import { useSelector } from "react-redux";
import { selectEnableAuth } from "../Login/store/AuthSelector";
import LoginCard from "./components/loginCard";
import { Loader } from "../../components/Loader";

const heroImage = require("../../assets/images/hero-2.png");
const parcely = require("../../assets/images/leavesP.png");
const onion1 = require("../../assets/images/onion2.png");
const onion2 = require("../../assets/images/onion1.png");
const tomato = require("../../assets/images/tomoto.png");

const products = [
  {
    image:
      "https://i.ibb.co/0jkZ2MyW/360-F-627235669-iz0-O2le-KYRzjx-AKd-FP7odpp9e-COZREt-N-removebg-preview.png",
    title: "Pizza Royale",
    price: "12.99",
    description:
      "A crispy, golden crust loaded with rich cheese, premium toppings, and authentic Italian flavors.",
    interest: "Cheesy Crispy Heavenly",
  },
  {
    image:
      "https://i.ibb.co/dJM9xbsz/bb087f3f2ccdb31bc63cd46f8fc65b4d-removebg-preview.png",
    title: "BBQ Chicken",
    price: "12.99",
    description:
      "Crispy, golden-brown fried chicken with a secret blend of 11 herbs and spices.",
    interest: "Crispy Tender Flavorful",
  },
  {
    image:
      "https://i.ibb.co/k2yLJGRG/f3255da749b284100d07d4ce2fe90862-removebg-preview.png",
    title: "Kebab Kingdom ",
    price: "14.99",
    description:
      "Juicy, flame-grilled kebabs infused with bold spices, served with fresh veggies and warm pita.",
    interest: "Spicy Juicy Smoky",
  },
  {
    image:
      "https://i.ibb.co/sd50sGtQ/deliciously-crispy-chicken-burger-hd-transparent-background-735811696679380g5lchfibmf-removebg-previ.png",
    title: "Burger Haven",
    price: "16.99",
    description:
      "A thick, juicy patty with fresh lettuce, melty cheese, and a perfectly toasted brioche bun.",
    interest: "Crispy Tender Flavorful",
  },
];

const Dashboard: React.FC = () => {
  const isAdmin = useSelector(selectEnableAuth);
  const navigate = useNavigate();
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 100); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIngredients(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const goToMenu = () => {
    navigate("/menu");
  };

  const goToLogin = () => {
    if (isAdmin) {
      navigate("/order");
    } else {
      navigate("/login");
    }
  };

  const tomatoAnimation1 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "-100px",
      translateY: "-100px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["56px", "-90px"],
      translateY: ["-460px", "-20px"],
      rotate: [0, 360],
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const tomatoAnimation2 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "150px",
      translateY: "-50px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["10px", "-50px"],
      translateY: ["190px", "-60px"],
      rotate: [0, -360],
      transition: { duration: 1.5, ease: "easeOut", delay: 0.2 },
    },
  };

  const tomatoAnimation3 = {
    hidden: { opacity: 0, scale: 0.8, translateX: "200px", translateY: "50px" },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["90px", "40px"],
      translateY: ["160px", "30px"],
      rotate: [0, 360],
      transition: { duration: 1.5, ease: "easeOut", delay: 0.4 },
    },
  };

  const onionAnimation1 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "-50px",
      translateY: "150px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["-50px", "0px"],
      translateY: ["150px", "0px"],
      rotate: [0, -360],
      transition: { duration: 1.5, ease: "easeOut", delay: 0.6 },
    },
  };

  const onionAnimation2 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "10px",
      translateY: "80px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.9, 1],
      translateX: ["120px", "60px"],
      translateY: ["10px", "79px"],
      rotate: [0, 360],
      transition: { duration: 1.5, ease: "easeOut", delay: 0.8 },
    },
  };

  // **Three Parsley (Parcely) Animations with Different Movements**
  const parcelyAnimation1 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "-80px",
      translateY: "-80px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["80px", "-80px"],
      translateY: ["90px", "-50px"],
      rotate: [0, 120],
      transition: { duration: 2, ease: "easeOut", delay: 1 },
    },
  };

  const parcelyAnimation2 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "-80px",
      translateY: "-80px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["-60px", "-150px"],
      translateY: ["-10px", "93px"],
      rotate: [0, -820],
      transition: { duration: 2, ease: "easeOut", delay: 1.2 },
    },
  };

  const parcelyAnimation3 = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      translateX: "-80px",
      translateY: "-80px",
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.2, 1],
      translateX: ["-80px", "-50px"],
      translateY: ["-80px", "50px"],
      rotate: [0, 1080],
      transition: { duration: 2.2, ease: "easeOut", delay: 1.4 },
    },
  };

  return (
    <div>
      {showSkeleton ? (
        <>
          <Box sx={{ width: "100%", borderRadius: 2, m: 4 }}>
            <Loader />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "530px",
              overflow: "hidden",
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 5vw",
              marginBottom: 3,
            }}
          >
            {/* Animated Ingredients */}
            <AnimatePresence>
              {showIngredients && (
                <>
                  <motion.img
                    src={tomato}
                    alt="Tomato 1"
                    style={{
                      position: "absolute",
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "10%",
                      top: "10%",
                    }}
                    variants={tomatoAnimation1}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={tomato}
                    alt="Tomato 2"
                    style={{
                      position: "absolute",
                      width: "140px",
                      height: "140px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "50%",
                      top: "5%",
                    }}
                    variants={tomatoAnimation2}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={tomato}
                    alt="Tomato 3"
                    style={{
                      position: "absolute",
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "90%",
                      top: "15%",
                    }}
                    variants={tomatoAnimation3}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={onion1}
                    alt="Onion 1"
                    style={{
                      position: "absolute",
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "20%",
                      bottom: "10%",
                    }}
                    variants={onionAnimation1}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={onion2}
                    alt="Onion 2"
                    style={{
                      position: "absolute",
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "80%",
                      bottom: "15%",
                    }}
                    variants={onionAnimation2}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={parcely}
                    alt="Parcely"
                    style={{
                      position: "absolute",
                      width: "100px",
                      height: "50px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "50%",
                      top: "50%",
                    }}
                    variants={parcelyAnimation1}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={parcely}
                    alt="Parcely"
                    style={{
                      position: "absolute",
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "50%",
                      top: "50%",
                    }}
                    variants={parcelyAnimation2}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.img
                    src={parcely}
                    alt="Parcely"
                    style={{
                      position: "absolute",
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      zIndex: 2,
                      left: "50%",
                      top: "50%",
                    }}
                    variants={parcelyAnimation3}
                    initial="hidden"
                    animate="visible"
                  />
                </>
              )}
            </AnimatePresence>

            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                textAlign: "left",
                zIndex: 3,
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Typography
                  variant="h3"
                  fontSize="3.3rem"
                  fontWeight="bold"
                  sx={{ color: appColors.orange[70] }}
                >
                  Fresh & Tasty Meals
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: appColors.orange[70] }}
                >
                  Served with Love!
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mt: 2, color: "#ddd" }}
                >
                  Experience the taste of fresh, cheesy, and mouth-watering
                  pizza made with the finest ingredients.
                </Typography>

                <Button
                  variant="contained"
                  onClick={goToMenu}
                  //   onClick={goToMenu}
                  sx={{
                    mt: 8,
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: appColors.orange[70],
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "18px",
                    "&:hover": {
                      backgroundColor: appColors.orange[80],
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Order Now
                </Button>
              </motion.div>
            </Box>

            {/* Hero Image */}
            <Box
              sx={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Box>
          </Box>

          {/* Product Section */}
          <Box sx={{ pr: 2, pl: 2, pb: 5 }}>
            <Grid container spacing={3} justifyContent="space-between">
              {products.map((product, index) => (
                <Grid item key={index}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <AdsCard />
          <LoginCard />
        </>
      )}
    </div>
  );
};

export default Dashboard;
