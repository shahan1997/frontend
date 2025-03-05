"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { IOrderID } from "../../core/interface/api.interface";
import {
  BasketItem,
  removeBasket,
  removeItem,
  updateItemCount,
} from "../Menu/store/BasketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectBasketItems } from "../Menu/store/BasketSelector";
import { useCancelOrderMutation, usePlaceOrderMutation } from "../posApi";
import { useNotifier } from "../../core/Notifier";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import empty from "../../../src/assets/images/empty.svg";
import addIconGreen from "../../../src/assets/images/add_icon_green.png";

import removeIcon from "../../../src/assets/images/remove_icon_red.png";

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectItem = useSelector(selectBasketItems);
  const [cancelOrder, { isLoading: updating, error: updateError }] =
    useCancelOrderMutation();
  const { showMessage } = useNotifier();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placeOrder, { isLoading, error }] = usePlaceOrderMutation();
  const [orderId, setOrderId] = useState<IOrderID | null>(null);

  const totalPrice = selectItem
    .reduce((acc, item) => acc + item.totalPrice, 0)
    .toFixed(2);

  const handleDelete = (itemId: string) => {
    dispatch(removeItem(itemId));
    showMessage("Order deleted from Cart");
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await cancelOrder(orderId?._id ?? "").unwrap();
      if (response.status) {
        showMessage(response.message);

        dispatch(removeBasket());
      } else {
        showMessage(response.message);
      }
    } catch (error) {
      console.error("Failed to update order", error);
    }
  };

  const handleIncrease = (item: BasketItem) => {
    const newCount = item.count + 1;
    const newTotalPrice =
      newCount * item.basePrice +
      item.selectedIngredients.reduce(
        (acc, ingredient) => acc + ingredient.price,
        0
      );
    dispatch(
      updateItemCount({
        id: item._id,
        count: newCount,
        totalPrice: newTotalPrice,
      })
    );
  };

  const handleDecrease = (item: BasketItem) => {
    if (item.count > 1) {
      const newCount = item.count - 1;
      const newTotalPrice =
        newCount * item.basePrice +
        item.selectedIngredients.reduce(
          (acc, ingredient) => acc + ingredient.price,
          0
        );

      dispatch(
        updateItemCount({
          id: item._id,
          count: newCount,
          totalPrice: newTotalPrice,
        })
      );
    } else {
      handleDelete(item._id);
    }
  };

  const handleProceedToCheckout = async () => {
    const orderData = {
      pizzas: selectItem.map((item: BasketItem) => ({
        pizzaId: item._id,
        name: item.name,
        images: item.images[0],
        basePrice: item.basePrice,
        description: item.description,
        ingredients: item.selectedIngredients,
        quantity: item.count,
        totalPrice: item.totalPrice,
        customText: item.customization,
      })),
      totalAmount: totalPrice,
    };

    try {
      const response = await placeOrder(orderData).unwrap();
      const orderID = response.data as IOrderID;
      setOrderId(orderID);
      if (response.status) {
        showMessage("We get your order");
        setIsOrderPlaced(true);
      } else {
        showMessage(response.message);
      }
    } catch (err) {
      console.error("Order placement failed", err);
      showMessage("Order placement failed", "error");
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: 4 }}>
      <Box sx={{ mx: "auto" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cart
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "black", height: "2px" }} />

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={7}>
            {selectItem.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "2px dotted #C0C0C0",
                  padding: 2,
                  borderRadius: 6,
                }}
              >
                <img
                  src={empty}
                  alt="empty"
                  className="step-image"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                  }}
                />

                <Typography
                  variant="body1"
                  fontSize="2rem"
                  color="black"
                  fontWeight="bold"
                  mb={2}
                >
                  Your cart is empty!
                </Typography>
                <Typography
                  variant="body2"
                  fontSize="1rem"
                  color="black"
                  mb={2}
                >
                  Add products to the cart
                </Typography>
              </Box>
            ) : (
              <Box>
                {selectItem.map((item) => (
                  <>
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        alignItems: "start",
                        gap: 2,
                        p: 2,
                        pl: 0,
                        pt: 0,
                        pb: 0,
                        mb: 0,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                      }}
                    >
                      <img
                        src={item.images[0] || "/placeholder.jpg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        style={{ borderRadius: 8, objectFit: "cover" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          color="black"
                          variant="body2"
                          fontSize="1.2rem"
                          sx={{ textAlign: "left" }}
                        >
                          {item.name} - ${item.basePrice}
                        </Typography>
                        <Typography fontWeight="bold" color="#818589">
                          {item.description}
                        </Typography>
                        <Typography fontWeight="Regular" color="#818589">
                          <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                              borderRadius: "50px",
                              backgroundColor: "black",
                              padding: "4px 8px",
                              width: "fit-content",
                            }}
                          >
                            <IconButton
                              onClick={() => handleDecrease(item)}
                              sx={{ padding: 0 }}
                            >
                              <img
                                src={removeIcon}
                                alt="Remove"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                            <Typography
                              variant="body2"
                              sx={{ margin: "0 8px", color: "white" }}
                            >
                              {item.count}
                            </Typography>
                            <IconButton
                              onClick={() => handleIncrease(item)}
                              sx={{ padding: 0 }}
                            >
                              <img
                                src={addIconGreen}
                                alt="Add"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                          </Box>
                        </Typography>

                        {item.selectedIngredients.length > 0 && (
                          <>
                            <Typography fontWeight="bold" mt={0}>
                              Extras:
                            </Typography>
                            <Box
                              sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                pl: 1,
                                gap: 1,
                              }}
                            >
                              {item.selectedIngredients.map((ing, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: "#f5f5f5",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <Typography
                                    fontSize="0.9rem"
                                    color="#71797E"
                                    fontWeight="bold"
                                  >
                                    {ing.name}
                                  </Typography>
                                  <Typography
                                    fontSize="0.9rem"
                                    fontWeight="bold"
                                    color="#71797E"
                                  >
                                    ${ing.name ? ing.price : "0.00"}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </>
                        )}

                        {item.customization && (
                          <Typography
                            fontWeight="Regular"
                            color="#818589"
                            sx={{ mt: 1 }}
                          >
                            Customization: {item.customization}
                          </Typography>
                        )}
                        <Typography
                          fontSize="1.4rem"
                          fontWeight="bold"
                          sx={{ mt: 2 }}
                        >
                          ${item.totalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => handleDelete(item._id)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Divider
                      sx={{ my: 2, bgcolor: "#818589", height: "2px" }}
                    />
                  </>
                ))}
              </Box>
            )}
          </Grid>
          {selectItem.length !== 0 ? (
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "#f5f5f5",
                  borderRadius: "8px",
                  border: "none",
                }}
              >
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2, bgcolor: "black", height: "2px" }} />
                <Box>
                  {selectItem.map((item) => (
                    <Box
                      key={item._id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}
                    >
                      <Typography variant="body2" fontSize="1rem">
                        {item.name}
                      </Typography>
                      <Typography fontWeight="bold">
                        ${item.totalPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2, bgcolor: "black", height: "2px" }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold" fontSize="1.8rem">
                    Total
                  </Typography>
                  <Typography fontWeight="bold" fontSize="1.8rem">
                    ${totalPrice}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleProceedToCheckout}
                  sx={{
                    pt: 0.5,
                    pb: 0.5,
                    mt: 2,
                    border: "none",
                    backgroundColor: "black",
                    borderRadius: "8px",
                    fontSize: "1.2rem",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                >
                  Complete Order
                </Button>
              </Box>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Page;
