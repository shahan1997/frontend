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
import { appColors } from "../../theme/appColors";
import FieldHeader from "../../components/FieldHeader";
import { useLoginMutation } from "../posApi";
import { IAuth } from "../../core/interface/api.interface";
import { setEnableAuth } from "./store/AuthSlice";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Loader } from "../../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const { showErrorMessage } = useNotifier();
  const [login, { isLoading }] = useLoginMutation();

  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 200); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  // Form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const loginResponse = await login(values).unwrap();

        if (!loginResponse.status) {
          showErrorMessage(loginResponse.message);
        } else {
          const tokenData = loginResponse.data as IAuth;
          localStorage.setItem("token", tokenData.token);
          localStorage.setItem("name", tokenData.user.name);
          dispatch(setEnableAuth());
          navigate("/products", { replace: true });
        }
      } catch (error: any) {
        showErrorMessage(error.data?.message || "Something went wrong");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.email !== "" && formik.values.password !== "";
  }, [formik]);

  return (
    <Grid container sx={{ height: "100vh" }}>
      {showSkeleton ? (
        <>
          <Box sx={{ width: "100%", borderRadius: 2, m: 4 }}>
            <Loader />
          </Box>
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minHeight: { xs: "40vh", md: "100vh" },
              backgroundImage: `url("https://thumbs.dreamstime.com/b/vibrant-pizza-wallpaper-cheesy-toppings-crispy-crust-vibrant-pizza-wallpaper-cheesy-toppings-crispy-crust-340060209.jpg")`,
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
                endIcon={<KeyboardArrowRightIcon />}
                onClick={() => navigate("/")}
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
                Back to Home
              </Button>
            </Box>

            <Typography
              variant="body1"
              sx={{
                position: "absolute",
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Log in to savor delicious moments, effortlessly managed
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
              backgroundColor: "#001440",
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
                  Login
                </Typography>
                <Box>
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
                      backgroundColor: "#f0f0f0", // Light grey color
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
                      border: "none",
                      width: "100%",
                      backgroundColor: "#f0f0f0",
                      "& .MuiInputBase-input::placeholder": {
                        color: "#888", // Change this color to whatever you like
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
                  Login
                </Button>
              </CardActions>
              <Typography
                variant="body2"
                align="center"
                sx={{ color: "white" }}
              >
                Don't have an account?{" "}
              </Typography>{" "}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="text"
                  sx={{
                    color: "lightblue",
                    border: "2px solid lightblue",
                    borderRadius: "8px",
                    padding: "4px 12px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, lightblue, transparent)",
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
                  onClick={() => navigate("/registrar")}
                >
                  Create one here
                </Button>
              </Box>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Login;
