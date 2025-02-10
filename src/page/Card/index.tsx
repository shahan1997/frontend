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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectBasketItems } from "../Menu/store/BasketSelector";
import {
  BasketItem,
  removeBasket,
  removeItem,
} from "../Menu/store/BasketSlice";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { appColors } from "../../theme/appColors";
import { useNotifier } from "../../core/Notifier";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectItem = useSelector(selectBasketItems);
  const { showMessage } = useNotifier();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const [openCheckout, setOpenCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // User details state
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    mobile: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    mobile: false,
  });

  const getTotalPrice = (item: BasketItem) => {
    const ingredientsTotal = item.selectedIngredients.reduce(
      (acc, ingredient) => acc + ingredient.price,
      0
    );
    return item.basePrice + ingredientsTotal;
  };

  const totalPrice = selectItem.reduce(
    (acc, item) => acc + getTotalPrice(item) * item.count,
    0
  );

  const handleDelete = (itemId: string) => {
    dispatch(removeItem(itemId));
    showMessage("Order deleted from Cart");
  };

  const handleProceedToCheckout = () => {
    setOpenCheckout(true);
  };

  const handleConfirmPayment = () => {
    let newErrors = {
      name: userDetails.name.trim() === "",
      address: userDetails.address.trim() === "",
      mobile: userDetails.mobile.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      showMessage(
        "Please fill in all the details before confirming payment.",
        "error"
      );
      return;
    }

    showMessage(`Payment successful using ${paymentMethod}`);

    setOpenCheckout(false);
    setIsOrderPlaced(true);
    // navigate("/", { replace: true });

    // dispatch(removeBasket());
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
                  <TableCell sx={{ fontWeight: "bold" }}>Base Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Ingredients</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectItem.map((item, idx) => {
                  const itemTotalPrice = getTotalPrice(item) * item.count;
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
                      <TableCell>${item.basePrice.toFixed(2)}</TableCell>
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
                      </TableCell>
                      <TableCell>${itemTotalPrice.toFixed(2)}</TableCell>
                      <TableCell>{item.count}</TableCell>
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
              Total Price for All Items: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={isOrderPlaced ? () => {} : handleProceedToCheckout}
              sx={{ marginTop: 2 }}
            >
              {isOrderPlaced ? "Track the Order" : "Proceed to Checkout"}
            </Button>
          </Box>
        </>
      )}

      {/* Checkout Dialog */}
      <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)}>
        <DialogTitle>Confirm Your Payment</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>

          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
          <TextField
            label="Address"
            fullWidth
            margin="dense"
            multiline
            rows={2}
            value={userDetails.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
            error={errors.address}
            helperText={errors.address ? "Address is required" : ""}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="dense"
            type="tel"
            value={userDetails.mobile}
            onChange={(e) =>
              setUserDetails({ ...userDetails, mobile: e.target.value })
            }
            error={errors.mobile}
            helperText={errors.mobile ? "Mobile number is required" : ""}
          />

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Select Payment Method:
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Credit/Debit Card"
            />
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="PayPal"
            />
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label="UPI Payment"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheckout(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            color="primary"
            variant="contained"
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartView;
