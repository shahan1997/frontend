import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { uploadImages } from "../../../core/utils";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardMedia,
  Stack,
  CircularProgress,
} from "@mui/material";
import { appColors } from "../../../theme/appColors";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment } from "@mui/material";
import { theme } from "../../../theme";
import { IProductData } from "../../../core/interface/api.interface";
import { useNotifier } from "../../../core/Notifier";
import { useSaveProductMutation } from "../../posApi";
import { useAppDispatch } from "../../../store/hooks";
import { restore } from "../../../store/posSlice";

interface INewProduct {
  openModel?: boolean;
  title: string;
  handleCloseDialog: (close: boolean) => void;
  data?: IProductData;
}

const NewProduct = ({
  title,
  openModel = true,
  handleCloseDialog,
  data,
}: INewProduct) => {
  // const [selectedImage, setSelectedImage] = React.useState<File | undefined>(
  //   undefined
  // );
  const [saveProduct, { isLoading }] = useSaveProductMutation();
  const [isImageUploading, setIsImageUploading] = React.useState(false);
  const { showErrorMessage } = useNotifier();
  const dispatch = useAppDispatch();
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]); // Array to hold File objects
  const [imageUrl, setImageUrl] = React.useState<
    { url: string; isFeatured: boolean }[]
  >([]); // Update the type here

  useEffect(() => {
    if (data?.images) {
      setImageUrl(data.images);
    }
  }, [data]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files); // Convert FileList to an array of File objects
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]); // Append the new files to the state
    }
  };

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      id: data?._id,
      name: data?.name,
      sku: data?.sku,
      quantity: data?.quantity,
      description: data?.description,
      price: data?.price,
      images: data?.images,
    },
    onSubmit: async (values) => {
      try {
        let imageUrls: { url: string; isFeatured: boolean }[] =
          data?.images ?? [];
        if (selectedFiles.length > 0) {
          setIsImageUploading(true);
          const uploadedImages = await uploadImages(selectedFiles);
          if (uploadedImages) {
            imageUrls = uploadedImages; // Safely assign the result to imageUrls
            console.log("New products.tsx:", imageUrls);
            setImageUrl(imageUrls); // Set the state with the updated imageUrls
          } else {
            console.log("No images uploaded.");
          }
        }

        const temData = {
          id: values?.id,
          sku: values.sku,
          name: values.name,
          quantity: values.quantity,
          price: values.price,
          description: values.description,
          images: imageUrls.length > 0 ? imageUrls : [],
        };
        if (!data) {
          delete temData.id;
        }
        console.log("tem data.tsx:", temData);
        const productResponse = await saveProduct(temData).unwrap();
        if (!productResponse.status) {
          showErrorMessage(productResponse.message);
        } else {
          dispatch(restore());
          handleClose();
        }
      } catch (error) {
        // setIsImageUploading(false);
        showErrorMessage("Please check you data");
      }
    },
    // validationSchema: {productSchema}
  });

  const formValid = useMemo(() => {
    return formik.values.name === "" ||
      formik.values.name === undefined ||
      formik.values.sku === "" ||
      formik.values.sku === undefined
      ? false
      : true;
  }, [formik]);
  const buttonText = data ? "Save changes" : "Add product";

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{}}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{ pb: "50px" }}>
              <GridItem size={5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Aligns items vertically in the center
                    gap: 1, // Space between Typography and TextField
                  }}
                >
                  <Typography
                    // variant="caption"
                    sx={{
                      fontSize: `19px`,
                      letterSpacing: "1px",
                      width: "100px",
                      fontWeight: 700,
                    }}
                  >
                    SKU
                  </Typography>
                  <TextField
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    {...formik.getFieldProps("sku")}
                    sx={{
                      height: `${theme.spacing(5)}`,
                      width: "100%",
                      borderRadius: "5px",
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
                  />
                </Box>
              </GridItem>
            </Grid>
            <Grid container spacing={2} sx={{ pb: "50px" }}>
              <GridItem size={5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Aligns items vertically in the center
                    gap: 1, // Space between Typography and TextField
                  }}
                >
                  <Typography
                    // variant="caption"
                    sx={{
                      fontSize: `19px`,
                      letterSpacing: "1px",
                      width: "100px",
                      fontWeight: 700,
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    {...formik.getFieldProps("name")}
                    sx={{
                      height: `${theme.spacing(5)}`,
                      width: "100%",

                      borderRadius: "5px",
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
                  />
                </Box>
              </GridItem>
              <GridItem size={2} />
              <GridItem size={5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Aligns items vertically in the center
                    gap: 1, // Space between Typography and TextField
                  }}
                >
                  <Typography
                    // variant="caption"
                    sx={{
                      fontSize: `19px`,
                      letterSpacing: "1px",
                      width: "100px",
                      fontWeight: 700,
                    }}
                  >
                    QTY
                  </Typography>
                  <TextField
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    type="number"
                    {...formik.getFieldProps("quantity")}
                    sx={{
                      height: `${theme.spacing(5)}`,
                      width: "100%",
                      ml: "20px",
                      borderRadius: "5px",
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
                  />
                </Box>
              </GridItem>
            </Grid>
            <Grid container spacing={2} sx={{ pb: "50px" }}>
              <GridItem size={5}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Aligns items vertically in the center
                    gap: 1, // Space between Typography and TextField
                  }}
                >
                  <Typography
                    // variant="caption"
                    sx={{
                      fontSize: `19px`,
                      letterSpacing: "1px",
                      width: "100px",
                      fontWeight: 700,
                    }}
                  >
                    Price
                  </Typography>
                  <TextField
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                    {...formik.getFieldProps("price")}
                    type="number"
                    sx={{
                      height: `${theme.spacing(5)}`,
                      width: "100%",
                      borderRadius: "5px",
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
                  />
                </Box>
              </GridItem>
            </Grid>
            <Grid container spacing={2} sx={{ pb: "50px" }}>
              <GridItem size={12}>
                <Typography
                  // variant="caption"
                  sx={{
                    fontSize: `19px`,
                    pb: "10px",
                    letterSpacing: "1px",
                    fontWeight: 700,
                  }}
                >
                  Product Description
                </Typography>
                <Typography
                  // variant="caption"
                  sx={{
                    fontSize: `14px`,
                    fontColors: appColors.greyLight,
                    letterSpacing: "1px",
                    fontWeight: 500,
                  }}
                >
                  A small description about the product
                </Typography>
                <TextField
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  {...formik.getFieldProps("description")}
                  sx={{
                    height: `${theme.spacing(5)}`,
                    width: "100%",
                    borderRadius: "5px",
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
                />
              </GridItem>
            </Grid>
            <Grid container spacing={2} sx={{ pb: "50px" }}>
              <GridItem size={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // Aligns items vertically in the center
                    gap: 1, // Space between Typography and TextField
                  }}
                >
                  <Typography
                    // variant="caption"
                    sx={{
                      fontSize: `19px`,
                      letterSpacing: "1px",
                      fontWeight: 700,
                    }}
                  >
                    Product Images
                  </Typography>
                  <Grid container spacing={2} sx={{ pb: "50px" }}>
                    {!isLoading &&
                      imageUrl.map((image, index) => (
                        <GridItem key={`initial-${index}`} size={3}>
                          <Card
                            sx={{
                              maxWidth: 150,
                              borderRadius: 2,
                              overflow: "hidden",
                              margin: "10px 0",
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="150"
                              image={`http://localhost:5000${image.url}`}
                              alt={`Product Image ${index + 1}`}
                            />
                          </Card>
                        </GridItem>
                      ))}
                    {selectedFiles.map((image, index) => (
                      <GridItem key={index} size={3}>
                        <Card
                          sx={{
                            maxWidth: 150,

                            borderRadius: 2,
                            overflow: "hidden",
                            margin: "10px 0",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="150"
                            image={URL.createObjectURL(image)}
                            alt={`Product Image ${index + 1}`}
                          />
                        </Card>
                      </GridItem>
                    ))}
                  </Grid>
                  <Button
                    component="label"
                    sx={{
                      fontSize: `19px`,
                      letterSpacing: "1px",
                      color: appColors.blue, // Blue color for the text
                      fontWeight: 700,
                      textDecoration: "underline", // Underline the text
                      textTransform: "none", // Keep original casing of the text
                      "&:hover": {
                        backgroundColor: "transparent", // Remove default button background on hover
                        textDecoration: "underline", // Keep underline on hover
                      },
                    }}
                  >
                    {selectedFiles.length === 0 ? "Add Image" : "Edit Images"}

                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*" // Only allow image files
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              </GridItem>
            </Grid>

            <GridItem size={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end", // Aligns button to the right
                }}
              >
                <Button
                  autoFocus
                  disabled={!formValid || isLoading}
                  onClick={() => {
                    formik.handleSubmit();
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
                    color: appColors.white,
                    "&:hover": {
                      backgroundColor: appColors.greyishBlue[20],
                    },
                  }}
                  variant="outlined"
                >
                  {isLoading && (
                    <Box sx={{ pr: 2, pt: 0.5 }}>
                      <CircularProgress size={16} sx={{ color: "white" }} />
                    </Box>
                  )}
                  {buttonText}
                </Button>
              </Box>
            </GridItem>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default NewProduct;

const GridItem = ({ ...rest }) => {
  return <Grid size={6} {...rest} />;
};
