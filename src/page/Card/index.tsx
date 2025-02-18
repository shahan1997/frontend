import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectBasketItems } from "../Menu/store/BasketSelector";
import {
  BasketItem,
  removeBasket,
  removeItem,
  updateItemCount,
} from "../Menu/store/BasketSlice";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { appColors } from "../../theme/appColors";
import { useNotifier } from "../../core/Notifier";
import { useNavigate } from "react-router-dom";
import { useCancelOrderMutation, usePlaceOrderMutation } from "../posApi";
import { IOrderID } from "../../core/interface/api.interface";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartView = () => {
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
    <Box
      sx={{
        padding: 3,
        minHeight: "80vh",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Your Cart
      </Typography>

      {selectItem.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "gray", marginTop: 5 }}>
            Your cart is empty. Start adding some items!
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Base Price * Qty
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Ingredients
                  </TableCell>{" "}
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Special Instructions
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectItem.map((item, idx) => {
                  return (
                    <TableRow
                      key={idx}
                      sx={{ "&:hover": { backgroundColor: "#f1f1f1" } }}
                    >
                      <TableCell>
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                          }}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        ${item.basePrice.toFixed(2)} * {item.count}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDecrease(item)}>
                          <RemoveIcon />
                        </IconButton>
                        {item.count}
                        <IconButton onClick={() => handleIncrease(item)}>
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {item.selectedIngredients.length > 0 ? (
                          <ul>
                            {item.selectedIngredients.map((ingredient, id) => (
                              <li key={id}>
                                {ingredient.name} - $
                                {ingredient.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            No extra ingredients
                          </Typography>
                        )}
                      </TableCell>{" "}
                      <TableCell>
                        {item.customization && item.customization.trim() !== ""
                          ? item.customization
                          : "N/A"}
                      </TableCell>
                      <TableCell> ${item.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <DeleteOutlinedIcon
                          onClick={() => handleDelete(item._id)}
                          sx={{
                            color: appColors.carmineRed[30],
                            cursor: "pointer",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ marginTop: 3, padding: 2, borderTop: "2px solid #ccc" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              Total Price for All Items: ${totalPrice}
            </Typography>
            <Button
              variant="contained"
              disabled={isLoading}
              color="primary"
              onClick={isOrderPlaced ? () => {} : handleProceedToCheckout}
              sx={{ marginTop: 2 }}
            >
              {" "}
              {isLoading && (
                <CircularProgress size={16} sx={{ color: "white", mr: 1 }} />
              )}
              {isOrderPlaced ? "Track the Order" : "Proceed to Checkout"}
            </Button>
            {isOrderPlaced && (
              <Button
                variant="outlined"
                disabled={updating}
                color="secondary"
                onClick={handleUpdateStatus}
                sx={{ marginTop: 2, marginLeft: 2 }}
              >
                {updating && (
                  <CircularProgress size={16} sx={{ color: "white", mr: 1 }} />
                )}
                Cancel Order
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartView;
