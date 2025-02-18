import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { appColors } from "../../theme/appColors";
import { header } from "../../styles/header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBasketItems } from "../../page/Menu/store/BasketSelector";
import { selectEnableAuth } from "../../page/Login/store/AuthSelector";
import { setDisableAuth } from "../../page/Login/store/AuthSlice";
import LogoutIcon from "@mui/icons-material/Logout";
const Header = ({ ...rest }) => {
  const selectItem = useSelector(selectBasketItems);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector(selectEnableAuth);
  const dispatch = useDispatch();

  const goToMenuCard = () => {
    navigate("/card");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    dispatch(setDisableAuth());
    navigate("/login");
  };

  if (
    location.pathname === "/login" ||
    location.pathname === "/registrar" ||
    (location.pathname === "/order" && !isAdmin) ||
    (location.pathname === "/products" && !isAdmin)
  ) {
    return null;
  }

  if (isAdmin) {
    return (
      <Box sx={{ ...header }} {...rest}>
        <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
          <Toolbar sx={{ mt: 1 }}>
            <Typography
              fontSize={20}
              fontWeight="bold"
              sx={{ flexGrow: 1, color: "white" }}
            >
              {localStorage.getItem("name")?.toLocaleUpperCase()}
            </Typography>
            <Button
              sx={{
                color: "white",
                mr: 2,
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
                mr: 2,
                border:
                  location.pathname === "/products"
                    ? "2px solid white"
                    : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/products")}
            >
              Products
            </Button>
            <Button
              sx={{
                color: "white",
                mr: 2,
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
                mr: 2,
                border:
                  location.pathname === "/order" ? "2px solid white" : "none",
                borderRadius: "8px",
                padding: "4px 12px",
                height: "30px",
              }}
              onClick={() => navigate("/order")}
            >
              Order
            </Button>

            <Button
              endIcon={<LogoutIcon sx={{ color: "white" }} />}
              onClick={handleLogout}
              sx={{ mr: 2, color: "white" }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <Box sx={{ ...header }} {...rest}>
      <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
        <Toolbar sx={{ mt: 1 }}>
          <Box>
            <img
              src={"https://i.ibb.co/xyWVwZv/logo.png"}
              alt="Logo"
              style={{ height: 60 }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              sx={{
                color: "white",
                mr: 2,
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
                mr: 2,
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
                mr: 2,
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
              Contact US
            </Button>
            <IconButton
              color="inherit"
              aria-label="shopping cart"
              onClick={goToMenuCard}
              sx={{
                border:
                  location.pathname === "/card" ? "2px solid white" : "none",
                borderRadius: "10%", // keeps the button round
              }}
            >
              <Badge
                badgeContent={selectItem.length}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    right: 2,
                    top: 11,
                    backgroundColor: appColors.orange[50],
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
    </Box>
  );
};

export default React.memo(Header);
