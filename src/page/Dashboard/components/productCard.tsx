"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  image: string;
  title: string;
  price: string;
  description: string;
  interest: string;
}

const ProductCard: React.FC<ProductProps> = ({
  image,
  title,
  price,
  description,
  interest,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const goToMenu = () => {
    navigate("/menu");
  };

  return (
    <Card
      component={motion.div}
      initial={false}
      animate={isHovered ? "hovered" : "rest"}
      whileHover="hovered"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={goToMenu}
      sx={{
        width: 300,
        height: 400,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        variants={{
          rest: { backgroundColor: "white" },
          hovered: { backgroundColor: "orange" },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <Box sx={{ position: "relative", zIndex: 1, height: "100%" }}>
        <motion.div
          variants={{
            rest: { y: 0 },
            hovered: { y: "50%" },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ position: "absolute", top: 10, left: 0, right: 0 }}
        >
          <CardMedia component="img" height="230" image={image} alt={title} />

          <motion.div
            variants={{
              rest: { opacity: 1, y: 0 },
              hovered: { opacity: 0, y: -10 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              {interest}
            </Typography>
          </motion.div>
          {/* <motion.div
            variants={{
              rest: { opacity: 1, y: 0 },
              hovered: { opacity: 0, y: -10 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              pizza
            </Typography>
          </motion.div> */}
        </motion.div>

        {/* Pizza Lover text (visible initially, hides on hover) */}
        {/* <motion.div
          variants={{
            rest: { opacity: 1, y: 0 },
            hovered: { opacity: 0, y: -20 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ position: "absolute", top: 20, left: 20, right: 20 }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            Pizza Lover
          </Typography>
        </motion.div> */}

        {/* Header text (initially at bottom) */}
        <motion.div
          variants={{
            rest: { y: "100%", opacity: 1 },
            hovered: { y: 0, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ position: "absolute", bottom: 40, left: 20, right: 20 }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color={isHovered ? "white" : "primary"}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            color={isHovered ? "white" : "secondary"}
            sx={{ mt: 1 }}
          >
            ${price}
          </Typography>
        </motion.div>

        <motion.div
          variants={{
            rest: { opacity: 0, y: 20 },
            hovered: { opacity: 1, y: 0 },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.1,
          }}
          style={{ position: "absolute", top: 20, left: 20, right: 20 }}
        >
          <Typography variant="body2" color="white">
            {description}
          </Typography>
        </motion.div>
      </Box>
    </Card>
  );
};

export default ProductCard;
