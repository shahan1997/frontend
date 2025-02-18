import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import {
  IPizza,
  IProductListResponse,
} from "../../core/interface/api.interface";
import { appColors } from "../../theme/appColors";
import NewProduct from "./components/NewProduct";
import { useDeleteProductMutation, useGetAllProductQuery } from "../posApi";
import DeletePopup from "../../components/DeletePopup";
import { useNotifier } from "../../core/Notifier";

const AdminCard = () => {
  const { showErrorMessage, showMessage } = useNotifier();
  const [open, setOpen] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteProduct] = useDeleteProductMutation();

  const { data, isLoading } = useGetAllProductQuery();
  const productDataMemo = useMemo(() => {
    return data?.data as IProductListResponse;
  }, [data?.data]);

  const [productData, setProductData] = useState<IPizza>();

  const handleDeleteProduct = async (id: string) => {
    try {
      console.log("iddd", id);
      const response = await deleteProduct(id).unwrap();
      if (response.status) {
        showMessage(response.message);
      } else {
        showErrorMessage(response.message);
      }
    } catch (error) {}
  };

  const filteredPizzas = useMemo(() => {
    return productDataMemo?.pizzas.filter((pizza) => {
      const lowercasedQuery = searchQuery.toLowerCase();
      return (
        pizza.name.toLowerCase().includes(lowercasedQuery) ||
        pizza.description.toLowerCase().includes(lowercasedQuery)
      );
    });
  }, [searchQuery, productDataMemo?.pizzas]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Product"
          size="small"
          sx={{
            width: 300,
            mr: 5,
            mb: 0,
            marginTop: "20px",
            "& .MuiFormLabel-root.MuiInputLabel-root": {
              color: "appColors.darkGray[20]",
            },
          }}
          variant="outlined"
        />
        <Button
          onClick={() => {
            setProductData(undefined);
            setOpen(true);
          }}
          startIcon={<AddIcon />}
          sx={{
            mb: 0,
            border: "none",
            backgroundColor: appColors.darkGreen[20],
            marginTop: "20px",
            borderRadius: "8px",
            cursor: "pointer",
            width: 200,
            height: 42,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: appColors.greyishBlue[20],
            },
          }}
          variant="outlined"
        >
          Add Product
        </Button>
      </Box>
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {isLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <Grid item key={i} md={3} xs={12}>
                <Box height={250}>
                  <Skeleton height={250} variant="rectangular" width={"100%"} />
                </Box>
              </Grid>
            ))}
          {!isLoading && filteredPizzas?.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              No search results found.
            </Typography>
          )}

          {!isLoading &&
            filteredPizzas?.map((pizza) => (
              <Grid item xs={12} sm={6} md={3} key={pizza._id}>
                <Card
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    minHeight: "480px",
                    display: "flex",
                    flexDirection: "column", // Arrange content and actions in a column
                    justifyContent: "space-between",
                    transition: "border-color 0.3s ease-in-out",
                    "&:hover": {
                      borderColor: appColors.darkGreen[20],
                    },
                  }}
                >
                  {pizza.images[0] && (
                    <CardMedia
                      component="img"
                      height="150"
                      image={
                        pizza.images[0].startsWith("/")
                          ? `http://localhost:5000${pizza.images[0]}`
                          : pizza.images[0]
                      }
                      sx={{
                        objectFit: "cover",
                        marginLeft: "0px",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                  )}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6">{pizza.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pizza.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Price:</strong> ${pizza.basePrice}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Ingredients:</strong>
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        ml: 5,
                      }}
                    >
                      {pizza.ingredients.map((ingredient, index) => (
                        <Typography key={index} sx={{ fontSize: "14px" }}>
                          {ingredient.name} -{" "}
                          <strong>${ingredient.price}</strong>
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setProductData(pizza);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        setProductData(pizza);
                        setOpenDeleteProduct(true);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {open && (
        <NewProduct
          data={productData}
          handleCloseDialog={() => setOpen(false)}
          openModel={open}
          title={productData ? "Edit Product" : "Add Product"}
        />
      )}
      {openDeleteProduct && (
        <DeletePopup
          content={"Confirm Delete"}
          handleCloseDelete={() => setOpenDeleteProduct(false)}
          onConfirm={async () => {
            await handleDeleteProduct(productData?._id || "");
            setOpenDeleteProduct(false);
          }}
          open={openDeleteProduct}
          title={"Delete Product"}
        />
      )}
    </Box>
  );
};

export default AdminCard;
