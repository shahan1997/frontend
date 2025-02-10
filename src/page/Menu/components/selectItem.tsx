import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Card,
  CardMedia,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Divider,
} from "@mui/material";
import { IPizza } from "../../../core/interface/api.interface";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch } from "../../../store/hooks";
import { addItem, BasketItem } from "../store/BasketSlice";
import { useNotifier } from "../../../core/Notifier";

interface Ingredient {
  name: string;
  price: number;
}

interface PizzaDetailsDialogProps {
  open: boolean;
  pizza: IPizza | null;
  onClose: () => void;
}

const SelectItem: React.FC<PizzaDetailsDialogProps> = ({
  open,
  pizza,
  onClose,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const { showErrorMessage, showMessage } = useNotifier();

  useEffect(() => {
    if (pizza) {
      setSelectedIngredients([]);
      setQuantity(1);
    }
  }, [pizza]);

  if (!pizza) return null;

  const handleIngredientChange = (ingredient: Ingredient) => {
    setSelectedIngredients((prevSelected) => {
      const isSelected = prevSelected.some(
        (item) => item.name === ingredient.name
      );
      return isSelected
        ? prevSelected.filter((item) => item.name !== ingredient.name)
        : [...prevSelected, ingredient];
    });
  };

  const totalPrice = (
    pizza.basePrice * quantity +
    selectedIngredients.reduce(
      (acc, ingredient) => acc * quantity + ingredient.price,
      0
    )
  ).toFixed(2);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10));
    setQuantity(newQuantity);
  };

  const handlePizzaClick = (pizza: IPizza) => {
    const basketItem: BasketItem = {
      ...pizza,
      selectedIngredients,
      count: quantity,
      totalPrice: parseFloat(totalPrice),
    };

    dispatch(addItem(basketItem));
    onClose();
    showMessage("Added into Cart");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {pizza.name}
      </DialogTitle>

      <DialogContent sx={{ maxHeight: "100%" }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 3,
            padding: 2,
            maxWidth: "100%",
            boxShadow: "none",
          }}
        >
          {/* Left Side - Image */}
          <CardMedia
            component="img"
            sx={{
              width: "40%",
              height: "300px",
              objectFit: "cover",
              borderRadius: 2,
            }}
            image={pizza.images[0]}
            alt={pizza.name}
          />

          {/* Right Side - Content */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", fontWeight: 500 }}
            >
              {pizza.description}
            </Typography>

            {/* Base Price and Quantity */}
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginRight: 2 }}
              >
                Base Price: ${pizza.basePrice.toFixed(2)}
              </Typography>

              {/* Quantity Selector */}
              <Box sx={{ display: "flex", alignItems: "center", pl: 5 }}>
                <Typography variant="h6" sx={{ marginRight: 1 }}>
                  Quantity:
                </Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1 }}
                  sx={{ width: "60px" }}
                />
              </Box>
            </Box>

            {/* Ingredients Selection */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Select Extra Ingredients:</Typography>
            <FormGroup sx={{ maxHeight: "120px", overflowY: "auto", mt: 1 }}>
              {pizza.ingredients.map((ingredient, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedIngredients.some(
                        (item) => item.name === ingredient.name
                      )}
                      onChange={() => handleIngredientChange(ingredient)}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: "bold" }}>
                      {`${ingredient.name} - $${ingredient.price.toFixed(2)}`}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>

            {/* Total Price Section */}
            <Typography
              variant="h6"
              sx={{
                marginTop: 2,
                fontWeight: "bold",
                color: "green",
                fontSize: "1.2rem",
              }}
            >
              Total Price: ${totalPrice}
            </Typography>
          </Box>
        </Card>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handlePizzaClick(pizza)}
          color="primary"
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectItem;
