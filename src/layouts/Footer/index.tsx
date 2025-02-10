import { Box, Container, Grid, Typography } from "@mui/material";
import { appColors } from "../../theme/appColors";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px 0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          {/* Left side: Image */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <img
                src={require("../../assets/images/footer.png")}
                alt="Pizza Logo"
                style={{ width: "150px", height: "auto" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                paddingLeft: 50,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: appColors.white }}
              >
                Pizza Shop Name
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginBottom: 1, color: appColors.white }}
              >
                1234 Pizza Street, Townsville
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginBottom: 1, color: appColors.white }}
              >
                Phone: (123) 456-7890
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginBottom: 1, color: appColors.white }}
              >
                Email: contact@pizzashop.com
              </Typography>

              <Typography
                variant="body2"
                sx={{ textAlign: "center", color: appColors.royalBlue[90] }}
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
