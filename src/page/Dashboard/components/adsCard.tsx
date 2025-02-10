import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Restaurant as DineInIcon,
  LocalShipping as TakeawayIcon,
  DeliveryDining as DeliveryIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { appColors } from "../../../theme/appColors";

const AdsCard = () => {
  return (
    <Box
      sx={{ pr: 2, pl: 2, display: "flex", maxWidth: "100%", marginBottom: 3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
        style={{
          width: "40%",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", objectFit: "cover" }}
          image={require("../../../assets/images/pizza2.png")}
          alt={"imageAds"}
        />
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: 2,
          width: "60%",
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            component="div"
            sx={{
              mt: 6,
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: 1,
              color: appColors.black[100],
            }}
          >
            About our food
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: appColors.orange[70],
            }}
          >
            We make the best food in your town
          </Typography>
        </CardContent>

        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "flex-start", marginTop: 2, padding: 4 }}
        >
          <Grid
            item
            sx={{
              color: "#000",
              m: 2,
              border: "2px solid orange",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <IconButton sx={{ color: "#000" }}>
              <DineInIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: appColors.black[100] }}
            >
              Dine-in
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              color: "#000",
              m: 2,
              border: "2px solid orange",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <IconButton sx={{ color: "#000" }}>
              <TakeawayIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: appColors.black[100] }}
            >
              Takeaway
            </Typography>
          </Grid>

          <Grid
            item
            sx={{
              color: "#000",
              m: 2,
              border: "2px solid orange",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <IconButton sx={{ color: "#000" }}>
              <DeliveryIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: appColors.black[100] }}
            >
              Delivery
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdsCard;
