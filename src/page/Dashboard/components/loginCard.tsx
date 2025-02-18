import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const LoginCard = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Left side - Animated Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="img"
          src="https://img.freepik.com/premium-vector/drawing-chef-cooking-with-spoon-sauce_1087929-12556.jpg?semt=ais_hybrid"
          alt="Admin Portal"
          sx={{ width: "80%", borderRadius: "10px" }}
        />
      </Grid>

      {/* Right side - Text and Button */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{ textAlign: "start", color: "white", p: 4 }}
      >
        <Typography fontSize={50} fontWeight="bold">
          Admin Portal{" "}
        </Typography>
        <Typography fontSize={38} fontWeight="regular">
          Manage your system with ease{" "}
        </Typography>
        <Typography fontSize={28} sx={{ mb: 3 }}>
          This portal allows admins to manage orders, track product details,
          update inventory, and monitor system activity efficiently.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{
            borderRadius: "10px",
            backgroundColor: "black",
            color: "white",
            padding: "10px 20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, lightblue, transparent)",
              transition: "all 0.4s",
            },
            "&:hover": {
              color: "#fff",
              backgroundColor: "#001440",
              "&::before": {
                left: "100%",
              },
            },
          }}
          startIcon={
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
              }}
            >
              <AdminPanelSettingsIcon sx={{ color: "black" }} />
            </Box>
          }
        >
          Access
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginCard;
