import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { appColors } from "../../theme/appColors";
import { header } from "../../styles/header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person"; // Add Person Icon
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBasketItems } from "../../page/Menu/store/BasketSelector";
import ShoppingCartDrawer from "./ShoppingCartDrawer";
import LoginPopup from "../../page/Signin/signin";
import { selectEnableAuth } from "../../page/Signin/store/AuthSelector";
import { setDisableAuth } from "../../page/Signin/store/AuthSlice";
// import { logout } from "../../store/actions/authActions"; // Assuming you have an action to logout

const Header = ({ ...rest }) => {
  const selectItem = useSelector(selectBasketItems);
  const user = useSelector(selectEnableAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userName = localStorage.getItem("name");
  // Log the user value to the console
  console.log("User value:", user);

  const toggleCart = (open: boolean) => () => {
    setCartOpen(open);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    dispatch(setDisableAuth());
    setAnchorEl(null);
  };

  return (
    <Box sx={{ ...header }} {...rest}>
      <AppBar position="static" elevation={0} sx={{ mb: 3, p: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Side: Logo and Company Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              MyFoodApp
            </Typography>
          </Box>

          {/* Center: Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              sx={{
                color: "white",
                border:
                  location.pathname === "/dashboard"
                    ? "2px solid white"
                    : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Button
              sx={{
                color: "white",
                border:
                  location.pathname === "/menu" ? "2px solid white" : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/menu")}
            >
              Menu
            </Button>
            <Button
              sx={{
                color: "white",
                border:
                  location.pathname === "/contact-form"
                    ? "2px solid white"
                    : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/contact-form")}
            >
              Contact Us
            </Button>
          </Box>

          {/* Right Side: Login Button & Cart Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {!user ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#dc2626",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  border: "none",
                }}
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
            ) : (
              <IconButton
                color="inherit"
                onClick={handleMenuClick} // Open the user menu when clicked
              >
                <PersonIcon sx={{ color: appColors.white }} />
              </IconButton>
            )}

            {/* Cart Icon */}
            <IconButton
              color="inherit"
              aria-label="shopping cart"
              onClick={toggleCart(true)}
              sx={{
                border:
                  location.pathname === "/cart" ? "2px solid white" : "none",
                borderRadius: "10%",
              }}
            >
              <Badge
                badgeContent={selectItem.length}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    right: 1,
                    top: 6,
                    backgroundColor: "black",
                  },
                }}
              >
                <ShoppingCartIcon
                  sx={{
                    width: "30px",
                    height: "30px",
                    color: appColors.white,
                  }}
                />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartDrawer cartOpen={cartOpen} toggleCart={toggleCart} />

      {/* Login Popup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ zIndex: 9999 }} // To ensure it appears above other components
      >
        <MenuItem>
          <Typography variant="body1" sx={{ color: "black" }}>
            {userName}
          </Typography>{" "}
          {/* Display User Name */}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="body1" color="error">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default React.memo(Header);
