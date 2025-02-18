import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { appColors } from "../../theme/appColors";
import { selectEnableAuth } from "../../page/Login/store/AuthSelector";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Footer = () => {
  const isAdmin = useSelector(selectEnableAuth);
  const linkHover = { x: 5, color: "white" };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px 0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                src={require("../../assets/images/footer.png")}
                alt="Pizza Logo"
                style={{ width: "150px", height: "auto" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: appColors.white }}
              >
                Quick Links
              </Typography>
              <Link
                component={motion.a}
                href="/dashboard"
                color="inherit"
                underline="hover"
                sx={{ mt: 1 }}
                whileHover={linkHover}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Home
              </Link>
              <Link
                component={motion.a}
                href="/menu"
                color="inherit"
                underline="hover"
                sx={{ mt: 1 }}
                whileHover={linkHover}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Menu
              </Link>
              <Link
                component={motion.a}
                href="/contact-form"
                color="inherit"
                underline="hover"
                sx={{ mt: 1 }}
                whileHover={linkHover}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Contact Us
              </Link>
              {isAdmin && (
                <Link
                  component={motion.a}
                  href="/products"
                  color="inherit"
                  underline="hover"
                  sx={{ mt: 1 }}
                  whileHover={linkHover}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Products
                </Link>
              )}
              {isAdmin && (
                <Link
                  component={motion.a}
                  href="/order"
                  color="inherit"
                  underline="hover"
                  sx={{ mt: 1 }}
                  whileHover={linkHover}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Order
                </Link>
              )}
            </Box>
          </Grid>
          ={" "}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-end" },
                paddingRight: { xs: 0, sm: 5 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: appColors.white }}
              >
                Pizza Customer
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: appColors.white }}
              >
                201, main road, Batticaloa
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: appColors.white }}
              >
                Phone: 0652225424
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: appColors.white }}
              >
                Email: pizzacustomer@pizza.com
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  textAlign: "center",
                  color: appColors.royalBlue[90],
                }}
              >
                © 2025 Pizza Shop. All Rights Reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
