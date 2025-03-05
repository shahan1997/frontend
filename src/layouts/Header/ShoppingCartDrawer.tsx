import React from "react";
import { Box, Typography, Button, Drawer, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems } from "../../page/Menu/store/BasketSelector";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import { removeItem } from "../../page/Menu/store/BasketSlice";
import ClearIcon from "@mui/icons-material/Clear";
import { appColors } from "../../theme/appColors";
import empty from "../../../src/assets/images/empty.svg";

interface ShoppingCartDrawerProps {
  cartOpen: boolean;
  toggleCart: (open: boolean) => () => void;
}

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  cartOpen,
  toggleCart,
}) => {
  const selectItem = useSelector(selectBasketItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const totalPrice = selectItem
    .reduce((acc, item) => acc + item.totalPrice, 0)
    .toFixed(2);

  return (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={toggleCart(false)}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#121212",
        },
      }}
    >
      <Box sx={{ width: 750, p: 2 }}>
        <Typography fontSize="1.8rem" color="white" fontWeight="bold" mb={4}>
          Cart &nbsp;{selectItem.length > 0 && `( ${selectItem.length} )`}
        </Typography>
        {selectItem.length === 0 ? (
          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              color="white"
              mb={2}
              sx={{ mt: 2 }}
            >
              Your cart is empty!
            </Typography>
            <Typography variant="body1" color="white" mb={2}>
              Add products to the cart
              {/* Adjust the size as needed */}
            </Typography>
          </Box>
        ) : (
          <div>
            <Box sx={{ maxHeight: 300, overflowY: "auto", mb: 2 }}>
              {selectItem.length === 0 ? (
                <Typography variant="h5" color="white">
                  No items in cart.
                </Typography>
              ) : (
                selectItem.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mb: 2,
                      borderBottom: "1px solid #ddd",
                      pb: 1,
                    }}
                  >
                    {/* Left Side: Image and Name */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        alignItems: "left",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          m: 0,
                          p: 0,
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: 2,
                        }}
                        image={item.images[0]}
                        alt={item.name}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          color="#E5E4E2"
                          variant="body2"
                          sx={{ textAlign: "left" }}
                        >
                          {item.name}
                        </Typography>

                        <Typography
                          color="white"
                          fontSize="1rem"
                          sx={{ textAlign: "left" }}
                        >
                          {item.customization}{" "}
                        </Typography>
                        {item.selectedIngredients.length === 0 && (
                          <Box
                            sx={{
                              height: "20px",
                            }}
                          />
                        )}
                        {item.selectedIngredients &&
                          item.selectedIngredients.length > 0 && (
                            <Box
                              sx={{
                                marginTop: 1,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <EditAttributesIcon
                                sx={{
                                  color: "#C0C0C0",
                                  mr: 1,
                                  fontSize: {
                                    xs: 18,
                                    sm: 24,
                                    md: 30,
                                  },
                                }}
                              />

                              {item.selectedIngredients.length > 0 &&
                                item.selectedIngredients.map(
                                  (ingredient, idx) => (
                                    <Typography
                                      key={idx}
                                      variant="caption"
                                      sx={{
                                        textAlign: "center",
                                        color: "#C0C0C0",
                                        marginTop: 0,
                                      }}
                                    >
                                      - {ingredient.name}
                                    </Typography>
                                  )
                                )}
                            </Box>
                          )}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mt: 1,
                            mb: 1,
                          }}
                        >
                          {" "}
                          <Box
                            onClick={() => handleDelete(item._id)} // Add onClick handler to the container
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              cursor: "pointer", // Ensure the entire container is clickable
                            }}
                          >
                            <ClearIcon
                              sx={{
                                color: appColors.carmineRed[30],
                                mr: 1, // Optional: Adds spacing between the icon and text
                              }}
                            />
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{ color: appColors.carmineRed[30] }}
                            >
                              Remove
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        mr: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="#E5E4E2"
                        sx={{ marginTop: 1 }}
                      >
                        ${item.basePrice.toFixed(2)} × {item.count}
                      </Typography>
                      {item.selectedIngredients.length > 0 && (
                        <>
                          <Typography
                            variant="body1"
                            color="#E5E4E2"
                            sx={{ marginTop: 1 }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight="normal"
                              color="#E5E4E2"
                              sx={{ fontSize: "0.8rem", display: "inline" }}
                            >
                              extra &nbsp;
                            </Typography>
                            {"  "}$
                            {item.selectedIngredients
                              ? item.selectedIngredients.reduce(
                                  (acc, ingredient) => acc + ingredient.price,
                                  0
                                )
                              : 0}
                          </Typography>
                        </>
                      )}
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="#E5E4E2"
                        sx={{ marginTop: 1 }}
                      >
                        ${item.totalPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: 1,
                mb: 1,
              }}
            >
              <Typography
                fontSize="1.8rem"
                color="white"
                fontWeight="bold"
                mb={4}
              >
                Total
              </Typography>
              <Typography
                fontSize="1.8rem"
                color="white"
                fontWeight="bold"
                mb={4}
              >
                ${totalPrice}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                navigate("/card");
                toggleCart(false)();
              }}
              sx={{
                pt: 0.5,
                pb: 0.5,
                border: "none",
                backgroundColor: "white",
                borderRadius: "8px",
                fontSize: "1.2rem",
                color: "black",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                },
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
