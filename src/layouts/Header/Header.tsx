import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
} from "@mui/material";
import { appColors } from "../../theme/appColors";
import { header } from "../../styles/header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../../page/Menu/store/BasketSelector";

const Header = ({ ...rest }) => {
  const selectItem = useSelector(selectBasketItems);
  const navigate = useNavigate();

  const goToMenuCard = () => {
    navigate("/card");
  };
  return (
    <Box sx={{ ...header }} {...rest}>
      <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
        <Toolbar sx={{ mt: 1 }}>
          <img
            src={"https://i.ibb.co/xyWVwZv/logo.png"}
            alt="Logo"
            style={{ height: 60 }}
          />
          
          <IconButton
            color="inherit"
            aria-label="shopping cart"
            onClick={goToMenuCard}
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
                  width: "40px",
                  height: "40px",
                  color: appColors.white,
                }}
              />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default React.memo(Header);
