"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

import ProductCard from "./components/productCard";
import AdsCard from "./components/adsCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEnableAuth } from "../../../../admin/src/page/Login/store/AuthSelector";
import { Loader } from "../../components/Loader";
import Delivery from "./components/delivery";
import Category from "./components/categories";
import Team from "./components/team";
import Hero from "./components/hero";
import Order from "./components/order";
import TestimonialSection from "./components/testm";

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
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 100); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const goToMenu = () => {
    navigate("/menu");
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
          <Hero />
          <Category />
          <Order />
          {/* Product Section */}

          <Box sx={{ pr: 2, pl: 2, pb: 5, backgroundColor: "#fde4e4" }}>
            {/* Heading for Famous Products */}
            <Typography
              variant="h4"
              align="center"
              sx={{
                mb: 3,
                pt: 3,
                fontWeight: "bold",
                color: "#dc2626",
              }}
            >
              Famous Products
            </Typography>

            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              sx={{ pl: 8, pr: 8 }}
            >
              {products.map((product, index) => (
                <Grid item key={index}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Delivery />
          <Team />
          <TestimonialSection />
        </>
      )}
    </div>
  );
};

export default Dashboard;
