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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "../../../store/hooks";
import { addItem, BasketItem } from "../store/BasketSlice";
import { useNotifier } from "../../../core/Notifier";
import addIconGreen from "../../../assets/images/add_icon_green.png";
import ClearIcon from "@mui/icons-material/Clear";
import removeIcon from "../../../assets/images/remove_icon_red.png";

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
  const [customization, setCustomization] = useState<string>("");
  const { showErrorMessage, showMessage } = useNotifier();

  // Hard-coded ingredients
  const hardCodedIngredients: Ingredient[] = [
    { name: "Cheese", price: 2.0 },
    { name: "Mushrooms", price: 1.5 },
    { name: "Pepperoni", price: 2.5 },
    { name: "Bacon", price: 3.0 },
    { name: "Olives", price: 1.0 },
    { name: "Green Peppers", price: 1.2 },
    { name: "Pineapple", price: 2.0 },
    { name: "Ham", price: 2.3 },
    { name: "Onions", price: 1.0 },
    { name: "Garlic", price: 1.5 },
    { name: "Cheese", price: 2.0 },
    { name: "Mushrooms", price: 1.5 },
    { name: "Pepperoni", price: 2.5 },
    { name: "Bacon", price: 3.0 },
    { name: "Olives", price: 1.0 },
    { name: "Green Peppers", price: 1.2 },
    { name: "Pineapple", price: 2.0 },
    { name: "Ham", price: 2.3 },
    { name: "Onions", price: 1.0 },
    { name: "Garlic", price: 1.5 },
  ];

  useEffect(() => {
    if (pizza) {
      setSelectedIngredients([]);
      setQuantity(1);
      setCustomization("");
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
    selectedIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
  ).toFixed(2);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handlePizzaClick = (pizza: IPizza) => {
    const basketItem: BasketItem = {
      ...pizza,
      selectedIngredients,
      count: quantity,
      totalPrice: parseFloat(totalPrice),
      customization,
    };

    dispatch(addItem(basketItem));
    onClose();
    showMessage("Added into Cart");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px", // Rounded corners
        },
      }}
    >
      <DialogTitle sx={{ position: "relative" }}>
        <ClearIcon
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 15,
            fontSize: "2rem",
            color: "#D70040",
            cursor: "pointer",
          }}
        />
      </DialogTitle>
      <DialogContent sx={{ maxHeight: "100%", mb: 1.5 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 3,
            padding: 1,
            maxWidth: "100%",
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "40%",
              height: "70vh",
              objectFit: "cover",
              borderRadius: 2,
            }}
            image={
              pizza.images[0].startsWith("/")
                ? `http://localhost:5000${pizza.images[0]}`
                : pizza.images[0]
            }
            alt={pizza.name}
          />

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {pizza.name}{" "}
            </Typography>
            <Typography
              variant="body1"
              color="	#808080"
              sx={{ fontSize: "1rem", fontWeight: 500 }}
            >
              {pizza.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
              <Typography
                sx={{ fontSize: "1.5rem", fontWeight: "500", marginRight: 2 }}
              >
                ${pizza.basePrice.toFixed(2)}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", pl: 5 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "50px",
                    border: "none",
                    padding: "5px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <img
                    src={removeIcon}
                    alt="Remove"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleQuantityChange(quantity - 1)}
                  />
                  <p
                    style={{
                      margin: "0 10px",
                      fontWeight: "bold",
                      color: "#71797E",
                    }}
                  >
                    {quantity}
                  </p>
                  <img
                    src={addIconGreen}
                    alt="Add"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleQuantityChange(quantity + 1)}
                  />
                </div>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", fontWeight: 500, mt: 2 }}
            >
              Select Extra Ingredients:
            </Typography>
            <FormGroup
              sx={{
                maxHeight: "120px",
                overflowY: "auto",
                mt: 0.5,
                ml: 2,
                mb: 0.5,
                "&::-webkit-scrollbar": {
                  width: "8px",
                  position: "absolute",
                  left: 0,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {pizza.ingredients.map((ingredient, index) => (
                <FormControlLabel
                  sx={{ m: 0, p: 0 }}
                  key={index}
                  control={
                    <Checkbox
                      sx={{
                        p: 0.5,
                        "&.Mui-checked": {
                          color: "#71797E",
                        },
                      }}
                      checked={selectedIngredients.some(
                        (item) => item.name === ingredient.name
                      )}
                      onChange={() => handleIngredientChange(ingredient)}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      color="		#71797E"
                      sx={{ fontSize: "1rem", fontWeight: 500, m: 0, p: 0 }}
                    >
                      {`${ingredient.name} - $${ingredient.price.toFixed(2)}`}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", fontWeight: 500, mt: 2 }}
            >
              Special instruction:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={1}
              placeholder="Enter any special instructions or preferences"
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              sx={{
                mt: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: "1.5rem", fontWeight: "500", marginRight: 2 }}
              >
                Total Price: ${totalPrice}
              </Typography>
              <Button
                onClick={() => handlePizzaClick(pizza)}
                color="primary"
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "black",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  px: 1.5,
                  py: 0.5,
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Card>
      </DialogContent>

      {/* <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
      </DialogActions> */}
    </Dialog>
  );
};

export default SelectItem;
