import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Stack,
  Box,
  InputAdornment,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import { appColors } from "../../theme/appColors";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ReactTable from "./Component/Table";
import { useDeleteProductMutation, useGetAllProductQuery } from "../posApi";
import { IProductData } from "../../core/interface/api.interface";
import NewProduct from "./Component/NewProduct";
import DeletePopup from "../../components/DeletePopup";
import { useNotifier } from "../../core/Notifier";

const Product = () => {
  const [isFavoriteMode, setIsFavoriteMode] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [open, setOpen] = useState(false);
  const { showErrorMessage, showMessage } = useNotifier();
  const [deleteProduct] = useDeleteProductMutation();
  const [productData, setProductData] = useState<IProductData>();
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (product: IProductData) => {
    setProductData(product);
    setOpenDeleteProduct(true);
  };

  const handleDeleteApi = async (id: string) => {
    setOpenDeleteProduct(true);
    try {
      console.log(`Editing product with id: ${id}`);
      const response = await deleteProduct(id).unwrap();
      if (response.status) {
        showMessage("Deleted successfully");
      } else {
        showErrorMessage("Failed to delete the product");
      }
    } catch (error) {}
  };

  const handleEdit = (product: IProductData) => {
    setProductData(product);
    setOpen(true);
  };

  const handleStar = (product: IProductData) => {
    console.log(`Starring product with id: ${product._id}`);
  };

  const handleFav = () => {
    setIsStarred((prev) => !prev);
    setIsFavoriteMode((prev) => !prev);
  };

  const {
    data: productDataApi,
    isLoading,
    isFetching,
    error,
  } = useGetAllProductQuery();

  const productDataMemo: IProductData[] = useMemo(() => {
    if (productDataApi && productDataApi.data) {
      return Array.isArray(productDataApi.data) ? productDataApi.data : [];
    }
    return [];
  }, [productDataApi?.data]);

  const filteredProducts: IProductData[] = useMemo(() => {
    if (!searchQuery) {
      return [];
    }
    return productDataMemo.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productDataMemo, searchQuery]);

  return (
    <Box sx={{ padding: "20px", pr: "60px", pl: "60px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Satoshi",
            fontSize: "36px",
            fontWeight: 900,
            lineHeight: "48.6px",
            letterSpacing: "0.15em",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
          }}
        >
          {isFavoriteMode ? "FAVORITE PRODUCTS   " : "PRODUCTS   "}
        </Typography>
        {open && (
          <Typography
            variant="h1"
            sx={{
              fontFamily: "Satoshi",
              fontSize: "24px",
              fontWeight: 500,
              fontColor: appColors.blue,
              color: appColors.blue,
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            &gt; {productData ? "  Edit products" : "  Add products"}
          </Typography>
        )}
      </Box>{" "}
      {open && (
        <NewProduct
          data={productData}
          handleCloseDialog={() => setOpen(false)}
          openModel={open}
          title={productData ? "Edit products" : "Add products"}
        />
      )}
      {openDeleteProduct && (
        <DeletePopup
          content={"You will not be to undo this action if you process!"}
          handleCloseDelete={() => setOpenDeleteProduct(false)}
          onConfirm={async () => {
            await handleDeleteApi(productData?._id || "");
            setOpenDeleteProduct(false);
          }}
          open={openDeleteProduct}
          title={"ARE YOU SURE"}
        />
      )}
      {!open && (
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              width: "100%",
              borderRadius: 2,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search for a product"
              onChange={handleSearchInputChange}
              value={searchQuery}
              sx={{
                width: {
                  xs: "100%", // Full width on extra-small screens
                  sm: "80%", // 80% width on small screens
                  md: "60%", // 60% width on medium screens
                  lg: "50%", // 50% width on large screens
                },
                mr: 2,
                borderRadius: "50px",
                bgcolor: appColors.greyLight,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "16px",
                  opacity: 0.7,
                  fontWeight: 500,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "80px",
                        padding: "5px 10px",
                        bgcolor: appColors.blue,
                        width: {
                          xs: "80px", // Adjust width on extra-small screens
                          sm: "100px", // 100px on small screens
                          md: "120px", // 120px on medium screens
                          lg: "150px", // 150px on large screens
                        },
                        justifyContent: "center", // Center content in the adornment
                      }}
                    >
                      <SearchIcon sx={{ mr: 1, color: appColors.white }} />
                      <Box
                        sx={{
                          color: "white",
                          fontSize: "19px",
                          fontWeight: 700,
                        }}
                      >
                        Search
                      </Box>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
            <Grid container spacing={12}>
              <Grid>
                <Button
                  onClick={() => {
                    // setProductData(undefined);
                    setOpen(true);
                  }}
                  sx={{
                    mb: 0,
                    mr: 2,
                    border: "none",
                    backgroundColor: appColors.blue,

                    borderRadius: "8px",
                    cursor: "pointer",
                    width: 200,
                    height: 42,
                    fontWeight: "bold",
                    color: appColors.white, // Use 'color' to change the font color
                    "&:hover": {
                      backgroundColor: appColors.greyishBlue[20],
                    },
                  }}
                  variant="outlined"
                >
                  New product
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleFav}
                  sx={{
                    mb: 0,
                    borderColor: appColors.blue,
                    borderRadius: "8px",
                    cursor: "pointer",

                    "&:hover": {
                      backgroundColor: appColors.greyishBlue[20],
                    },
                  }}
                  startIcon={
                    <img
                      src={
                        require("../../../src/assets/images/starred.svg")
                          .default
                      }
                      alt="Star"
                      style={{ width: 24, height: 24 }}
                    />
                  }
                ></Button>
              </Grid>
            </Grid>
          </Box>

          {(isLoading || isFetching) && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress sx={{ color: appColors.blue }} />
            </Box>
          )}
          {!isLoading && !isFetching && productDataMemo && !searchQuery && (
            <ReactTable
              productData={productDataMemo}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onStar={handleStar}
              isStarred={isStarred}
            />
          )}

          {searchQuery && filteredProducts.length === 0 && (
            <Typography
              sx={{
                mb: 2,
                color: appColors.grey,
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              No results found for "{searchQuery}"
            </Typography>
          )}

          {searchQuery && filteredProducts.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  mb: 2,
                  color: appColors.grey,
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                {filteredProducts.length} results found for "{searchQuery}"
              </Typography>

              {filteredProducts.map((product, index) => (
                <Box key={product._id} sx={{ mb: 3, pl: "50px" }}>
                  <Typography
                    sx={{
                    
                      color: appColors.blue,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {product.sku}
                  </Typography>
                  <Typography
                    sx={{
                     
                      color: appColors.black[100],
                      fontSize: "19px",
                      fontWeight: 700,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    sx={{
                     
                      color: appColors.grey,
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Box>
              ))}
            </Box>
          )}
        </div>
      )}
      {/* <div>
        <pre>{JSON.stringify(productDataMemo, null, 2)}</pre>
      </div> */}
    </Box>
  );
};

export default Product;
