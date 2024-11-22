import React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  Badge,
} from "@mui/material";
import { appColors } from "../../theme/appColors";
import { keyframes } from "@mui/system";
import { header } from "../../styles/header";

const marqueeAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const Header = ({ ...rest }) => {
  return (
    <Box sx={{ ...header }} {...rest}>
      <Box>
        <Grid container sx={{ width: "100%", height: "100px" }}>
          <Grid size={8}></Grid>
          <Grid display="flex" justifyContent="flex-end" size={4}>
            <Badge
              color="success"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  right: 7,
                  minWidth: "10px",
                  height: "10px",
                  borderRadius: "100%",
                  top: 45,
                  mr: "23px",
                  backgroundColor: appColors.green,
                },
              }}
              badgeContent=" "
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Box
                color="success"
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  mt: "5px",
                  mr: "20px",
                  backgroundColor: appColors.blue,
                }}
              />
            </Badge>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default React.memo(Header);
