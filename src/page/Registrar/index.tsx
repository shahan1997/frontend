/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "../../store/hooks";
import { useNotifier } from "../../core/Notifier";
import { theme } from "../../theme";

import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRegisterMutation } from "../posApi";

const Register = () => {
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { showErrorMessage, showMessage } = useNotifier();
  const [registrar, { isLoading }] = useRegisterMutation();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Form validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await registrar(values).unwrap();

        if (!response.status) {
          showErrorMessage(response.message);
        } else {
          showMessage(response.message);
          navigate("/login", { replace: true });
        }
      } catch (error: any) {
        showErrorMessage(error.data?.message || "Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return (
      formik.values.name !== "" &&
      formik.values.email !== "" &&
      formik.values.password !== ""
    );
  }, [formik]);

  return (
    <Grid container sx={{ height: "100vh" }}>
      {showSkeleton ? (
        <Box sx={{ width: "100%", borderRadius: 2, m: 4 }}>
          <Skeleton variant="rectangular" height={500} width="100%" />
        </Box>
      ) : (
        <>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minHeight: { xs: "40vh", md: "100vh" },
              backgroundImage: `url("https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148698592.jpg")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: 20, left: 20 }}>
              <img
                src={"https://i.ibb.co/xyWVwZv/logo.png"}
                width="100px"
                alt="Logo"
              />
            </Box>

            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => navigate(-1)}
                sx={{
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  backdropFilter: "blur(8px)",
                  textTransform: "none",
                  fontWeight: "bold",
                  padding: "2px 20px",
                  borderRadius: "20px",
                  boxShadow: "none",
                  border: "none",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                Back
              </Button>
            </Box>

            <Typography
              variant="body1"
              sx={{
                position: "absolute",
                bottom: 70,
                left: "50%",
                transform: "translateX(-10%)",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Sign up to start enjoying great offers and services!
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: "#000000",
            }}
          >
            <Card
              sx={{
                backgroundColor: "#001440",
                minWidth: isSmall ? 280 : 400,
                padding: 4,
                background: "rgba(255, 255, 255, 0.3)",
                color: "white",
                backdropFilter: "blur(8px)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "bold", color: "white", marginBottom: 2 }}
                >
                  Register
                </Typography>

                <Box>
                  <Typography sx={{ fontSize: "20px", color: "white" }}>
                    Name
                  </Typography>
                  <TextField
                    autoComplete="off"
                    placeholder="Enter your name"
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      width: "100%",
                      backgroundColor: "#f0f0f0",
                    }}
                    {...formik.getFieldProps("name")}
                  />
                </Box>

                <Box sx={{ paddingTop: 3 }}>
                  <Typography sx={{ fontSize: "20px", color: "white" }}>
                    Email
                  </Typography>
                  <TextField
                    autoComplete="off"
                    placeholder="Enter your email"
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      width: "100%",
                      backgroundColor: "#f0f0f0",
                    }}
                    {...formik.getFieldProps("email")}
                  />
                </Box>

                <Box sx={{ paddingTop: 3 }}>
                  <Typography sx={{ fontSize: "20px", color: "white" }}>
                    Password
                  </Typography>
                  <TextField
                    autoComplete="off"
                    placeholder="Enter password"
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      width: "100%",
                      backgroundColor: "#f0f0f0",
                      "& .MuiInputBase-input::placeholder": {
                        color: "#888",
                      },
                    }}
                    {...formik.getFieldProps("password")}
                    type="password"
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ padding: "16px" }}>
                <Button
                  disabled={!formValid || isLoading}
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={formik.handleSubmit as any}
                >
                  {isLoading && (
                    <CircularProgress
                      size={16}
                      sx={{ color: "white", mr: 1 }}
                    />
                  )}
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Register;
