import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../posApi";
import { IOrder } from "../../core/interface/api.interface";
import { useNotifier } from "../../core/Notifier";

const OrdersTable = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
  const [updateOrderStatus, { isLoading: updating, error: updateError }] =
    useUpdateOrderStatusMutation();
  const { showMessage } = useNotifier();
  const [updatingStatusType, setUpdatingStatusType] = useState<string | null>(
    null
  );

  const handleUpdateStatus = async (newStatus: string) => {
    setUpdatingStatusType(newStatus);
    try {
      const response = await updateOrderStatus({
        orderId: selectedOrder?._id ?? "",
        status: newStatus,
      }).unwrap();
      if (response.status) {
        showMessage(response.message);
      } else {
        showMessage(response.message);
      }
    } catch (error) {
      console.error("Failed to update order", error);
    } finally {
      setUpdatingStatusType(null);
    }
  };

  const orderDataMemo = useMemo(() => {
    return data?.data as IOrder[];
  }, [data?.data]);

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (!isLoading && orderDataMemo.length > 0) {
      setSelectedOrder(orderDataMemo[0]);
    }
  }, [isLoading, orderDataMemo]);

  return (
    <Box display="flex" minHeight={500} gap={2} p={2}>
      {isLoading && (
        <>
          <Box sx={{ width: "50%", borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={500} width="100%" />
          </Box>
          <Box sx={{ width: "50%", borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={500} width="100%" />{" "}
          </Box>
        </>
      )}
      {!isLoading && orderDataMemo && selectedOrder && (
        <>
          <TableContainer
            component={Paper}
            sx={{ width: "50%", borderRadius: 2, mt: 2 }}
          >
            <Typography
              variant="h6"
              fontWeight="Medium"
              sx={{
                p: 2,
                bgcolor: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              Orders List
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.200" }}>
                  <TableCell align="center" sx={{ fontWeight: "Medium" }}>
                    Order No
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "Medium" }}>
                    Total Amount
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "Medium" }}>
                    Ordered At
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "Medium" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDataMemo.map((order) => (
                  <TableRow
                    key={order._id}
                    onClick={() => setSelectedOrder(order)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { bgcolor: "grey.100" },
                      bgcolor:
                        selectedOrder._id === order._id
                          ? "lightskyblue"
                          : "white",
                    }}
                  >
                    <TableCell align="center">{order.orderNumber}</TableCell>
                    <TableCell align="center">${order.totalAmount}</TableCell>
                    <TableCell align="center">
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color:
                            order.status === "delivered"
                              ? "green"
                              : order.status === "cancelledByAdmin"
                              ? "crimson"
                              : order.status === "cancelledByCustomer"
                              ? "blue"
                              : "navy",
                        }}
                      >
                        {(order.status === "delivered"
                          ? "delivered"
                          : order.status === "cancelledByAdmin"
                          ? "cancelled By Admin"
                          : order.status === "cancelledByCustomer"
                          ? "cancelled By Customer"
                          : "pending"
                        ).toUpperCase()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Right Side - Order Details */}
          <Card sx={{ width: "50%", maxWidth: "700px", borderRadius: 2 }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  textAlign: "center",
                  mb: 2,
                  bgcolor: "black",
                  color: "white",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                Order No - {selectedOrder.orderNumber}
              </Typography>
              <Box
                sx={{
                  bgcolor: "aliceblue",
                  p: 2,
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Typography variant="body1" sx={{ fontSize: 16, mb: 1 }}>
                  <strong>Status:</strong>{" "}
                  <strong
                    style={{
                      color:
                        selectedOrder.status === "delivered"
                          ? "green"
                          : selectedOrder.status === "cancelledByAdmin"
                          ? "crimson"
                          : selectedOrder.status === "cancelledByCustomer"
                          ? "blue"
                          : "navy",
                    }}
                  >
                    {(selectedOrder.status === "delivered"
                      ? "delivered"
                      : selectedOrder.status === "cancelledByAdmin"
                      ? "cancelled By Admin"
                      : selectedOrder.status === "cancelledByCustomer"
                      ? "cancelled By Customer"
                      : "pending"
                    ).toUpperCase()}
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 16, mb: 1 }}>
                  <strong>
                    Total: ${selectedOrder.totalAmount.toFixed(2)}
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 16, mb: 1 }}>
                  <strong>
                    Ordered At:{"         "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </strong>
                </Typography>
                {selectedOrder.status === "pending" && (
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                  >
                    {/* <Typography variant="body2" sx={{ color: "gray" }}>
                  Cancel if unwanted, mark as delivered when completed
                </Typography> */}

                    <Button
                      endIcon={
                        updatingStatusType === "delivered" ? (
                          <CircularProgress
                            size={16}
                            sx={{ color: "white", mr: 1 }}
                          />
                        ) : (
                          <TaskAltIcon sx={{ color: "green" }} />
                        )
                      }
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                      onClick={() => handleUpdateStatus("delivered")}
                    >
                      Delivered
                    </Button>
                    <Button
                      endIcon={
                        updatingStatusType === "cancelledByAdmin" ? (
                          <CircularProgress
                            size={16}
                            sx={{ color: "white", mr: 1 }}
                          />
                        ) : (
                          <ClearIcon sx={{ color: "red" }} />
                        )
                      }
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                      onClick={() => handleUpdateStatus("cancelledByAdmin")}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
              {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Basket
            </Typography>
            <LocalShippingIcon sx={{ color: "black" }} />
          </Box> */}
              <Grid container spacing={3} paddingLeft={2} paddingRight={2}>
                {selectedOrder.pizzas.map((pizza, index) => (
                  <Grid item xs={12} sm={6} md={6} lg={6} key={1}>
                    <Card
                      sx={{
                        bgcolor: "aliceblue",
                        borderRadius: 2,
                        border: "2px solid aliceblue",
                        "&:hover": {
                          borderColor: "midnightblue ",
                        },
                      }}
                    >
                      <CardContent>
                        <Box>
                          <Box display="flex" alignItems="flex-start">
                            <Box flex={1}>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {pizza.name} - ${pizza.basePrice}
                              </Typography>
                              <Typography variant="body2">
                                Quantity: {pizza.quantity}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "navy",
                                }}
                              >
                                Total: ${pizza.totalPrice.toFixed(2)}
                              </Typography>
                            </Box>
                            {/* Right side - Image */}
                            <Box ml={2}>
                              <img
                                src={pizza.images[0]}
                                alt={pizza.name}
                                width="100"
                                height="100"
                                style={{
                                  borderRadius: 8,
                                  border: "1px solid #ccc",
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="body1">Customization</Typography>
                          {pizza.ingredients.map((ing, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",

                                paddingLeft: 3,
                              }}
                            >
                              <Typography variant="body2">
                                {ing.name}
                              </Typography>
                              <Typography variant="body2">
                                ${ing.price}
                              </Typography>
                            </Box>
                          ))}
                          <Typography variant="body2" color="navy">
                            {pizza.customText}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default OrdersTable;
