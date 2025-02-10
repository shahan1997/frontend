import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ProductProps {
  image: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductProps> = ({
  image,
  title,
  price,
  description,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RhAkXrDXaU8_tVgEFovixM6eCSLN3CJl5Q&s"
        }
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {title}
        </Typography>
        <Typography
          variant="h5"
          color="secondary"
          fontWeight="bold"
          sx={{ mt: 1 }}
        >
          ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
