import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
} from "@mui/material";
import SelectItem from "./components/selectItem";
import { useGetAllProductQuery } from "../posApi";
import {
  IPizza,
  IProductListResponse,
} from "../../core/interface/api.interface";
import { useAppDispatch } from "../../store/hooks";
import { addItem, BasketItem } from "./store/BasketSlice";

// Define the type for the ingredients
interface Ingredient {
  name: string;
  price: number;
}

// Define the type for the pizza
interface Pizza {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  ingredients: Ingredient[];
  image: string;
}

const PizzaMenu = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAllProductQuery();
  const [open, setOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<IPizza | null>(null);

  const productDataMemo = useMemo(() => {
    return data?.data as IProductListResponse;
  }, [data?.data]);

  //!print
  useEffect(() => {
    console.log("Product Data Memo:", productDataMemo);
  }, [productDataMemo]);

  // Open modal with pizza details
  const handlePizzaClick = (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedPizza(null);
  };

  return (
    <Box sx={{ padding: 4 }} minHeight={500}>
      <Box sx={{ pr: 2, pl: 2, pb: 5 }}>
        <Grid container spacing={3}>
          {isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <Grid item key={i} md={3} xs={12}>
                <Box height={250}>
                  <Skeleton height={250} variant="rectangular" width={"100%"} />
                </Box>
              </Grid>
            ))}
          {!isLoading &&
            productDataMemo.pizzas.map((pizza) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pizza._id}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => handlePizzaClick(pizza)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      pizza.images[0].startsWith("/")
                        ? `http://localhost:5000${pizza.images[0]}`
                        : pizza.images[0]
                    }
                    alt={pizza.name}
                    sx={{
                      objectFit: "cover",
                      marginLeft: "0px",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      fontSize={"20px"}
                      sx={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pizza.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize={"18px"}
                      color="text.secondary"
                      sx={{
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {pizza.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ marginTop: 2 }}
                    >
                      Price: ${pizza.basePrice}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Use the new PizzaDetailsDialog component */}
      <SelectItem
        open={open}
        pizza={selectedPizza}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default PizzaMenu;
