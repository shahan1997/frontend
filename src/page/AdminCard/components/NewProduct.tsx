import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../../theme";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useNotifier } from "../../../core/Notifier";
import { useTranslation } from "react-i18next";
import { appColors } from "../../../theme/appColors";
import { rem } from "../../../theme/typography";
import { useAppDispatch } from "../../../store/hooks";
import { restore } from "../../../store/posSlice";
import { IPizza, IPizzaUpdate } from "../../../core/interface/api.interface";
import FieldHeader from "../../../components/FieldHeader";
import { uploadImage } from "../../../core/utils";
import { useSaveProductMutation, useUpdateProductMutation } from "../../posApi";

const inputComponent = {
  backgroundColor: "white",
  width: "100%",
  paddingRight: `${theme.spacing(1.5)}px`,
  paddingLeft: `${theme.spacing(1.5)}px`,
  paddingTop: `${theme.spacing(1.25)}px`,
  paddingBottom: `${theme.spacing(1.25)}px`,
  "& .MuiOutlinedInput-input": {
    paddingTop: 1,
  },
  fontSize: rem(14),
  lineHeight: `${theme.spacing(2)}px`,
  letterSpacing: "0.325px",
  color: "#808080",
  "& .MuiOutlinedInput-root": {
    height: "34px",
    paddingLeft: "0px",
    color: appColors.black[60],
    backgroundColor: appColors.royalBlue[60],
  },
};

interface INewPizzaProduct {
  openModel?: boolean;
  title: string;
  handleCloseDialog: (close: boolean) => void;
  data?: IPizza;
}

const NewPizzaProduct = ({
  title,
  openModel = true,
  handleCloseDialog,
  data,
}: INewPizzaProduct) => {
  const [open] = React.useState(openModel);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { showErrorMessage, showMessage } = useNotifier();
  const [selectedImage, setSelectedImage] = React.useState<File | undefined>(
    undefined
  );
  const [saveProduct, { isLoading }] = useSaveProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [isImageUploading, setIsImageUploading] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    handleCloseDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      name: data?.name,
      basePrice: data?.basePrice,
      description: data?.description,
      ingredients: data?.ingredients || [{ name: "", price: 0 }],
      images: data?.images[0] || [],
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        let images: string[] = data?.images || [];

        if (selectedImage) {
          setIsImageUploading(true);
          formData.append("image", selectedImage);
          const uploadedImage = await uploadImage(selectedImage);
          images.push(uploadedImage ?? "");
          setIsImageUploading(false);
        }

        const pizzaData: IPizzaUpdate = {
          name: values.name || "",
          basePrice: values.basePrice || 0,
          description: values.description || "",
          ingredients: values.ingredients || [{ name: "", price: 0 }],
          images,
        };
        console.log("pizz", pizzaData);

        const pizzaResponse = data
          ? await updateProduct({ id: data._id, data: pizzaData }).unwrap()
          : await saveProduct(pizzaData).unwrap();

        if (!pizzaResponse.status) {
          showErrorMessage(pizzaResponse.message);
        } else {
          showMessage(pizzaResponse.message);
          dispatch(restore());
          handleClose();
        }
      } catch (error) {
        setIsImageUploading(false);
        showErrorMessage((error as Error).message);
      }
    },
  });

  const formValid = useMemo(() => {
    return (
      formik.values.name !== "" &&
      (formik.values.basePrice || 0) > 0 &&
      formik.values.description !== "" &&
      formik.values.ingredients.every(
        (ingredient) => ingredient.name !== "" && ingredient.price > 0
      ) &&
      (selectedImage !== undefined || data?.images[0]) // Ensure at least one image
    );
  }, [formik, selectedImage, data]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    } else {
      setSelectedImage(undefined);
    }
  };

  const handleAddIngredient = () => {
    formik.setFieldValue("ingredients", [
      ...formik.values.ingredients,
      { name: "", price: 0 },
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = formik.values.ingredients.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Dialog
          aria-describedby="alert-dialog-description"
          classes={{ paper: "inherit" }}
          fullScreen={isMobile}
          fullWidth={isMobile}
          maxWidth="lg"
          open={open}
        >
          <DialogTitle
            sx={{
              fontWeight: 600,
              p: 3,
              backgroundColor: appColors.blueGreyishLight[30],
              borderRadius: "5px",
            }}
          >
            {title}
          </DialogTitle>
          <DialogContent
            sx={{ width: isMobile ? "auto" : "40vw", p: 4, marginTop: "20px" }}
          >
            <Box>
              <Grid container>
                <GridItem>
                  <FieldHeader title={"Name"} />
                  <TextField
                    autoComplete="off"
                    placeholder={"Name"}
                    size="small"
                    {...formik.getFieldProps("name")}
                    sx={{ height: `${theme.spacing(5)}`, width: "100%" }}
                  />
                </GridItem>

                <GridItem sx={{ pt: 2 }}>
                  <FieldHeader title={"Price"} />
                  <TextField
                    autoComplete="off"
                    placeholder={"Price"}
                    size="small"
                    {...formik.getFieldProps("basePrice")}
                    InputProps={{ inputProps: { min: 0 } }}
                    sx={{ height: `${theme.spacing(5)}`, width: "100%" }}
                    type="number"
                  />
                </GridItem>

                <GridItem sx={{ pt: 2 }}>
                  <FieldHeader title={"Description"} />
                  <TextField
                    autoComplete="off"
                    placeholder={"Description"}
                    size="small"
                    {...formik.getFieldProps("description")}
                    sx={{ height: `${theme.spacing(5)}`, width: "100%" }}
                  />
                </GridItem>

                <GridItem sx={{ pt: 2 }}>
                  <FieldHeader title={"Ingredients"} />
                  {formik.values.ingredients.map((ingredient, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", gap: "16px", mb: 2 }}
                    >
                      <TextField
                        size="small"
                        value={ingredient.name}
                        placeholder={"Ingredients name"}
                        onChange={(e) =>
                          formik.setFieldValue(
                            `ingredients[${index}].name`,
                            e.target.value
                          )
                        }
                        sx={{ width: "48%" }}
                      />
                      <TextField
                        size="small"
                        type="number"
                        placeholder={"Ingredients price"}
                        value={ingredient.price}
                        onChange={(e) =>
                          formik.setFieldValue(
                            `ingredients[${index}].price`,
                            e.target.value
                          )
                        }
                        sx={{ width: "48%" }}
                      />
                      <Button
                        onClick={() => handleRemoveIngredient(index)}
                        variant="outlined"
                        color="error"
                      >
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    onClick={handleAddIngredient}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  >
                    Add Ingredient
                  </Button>
                </GridItem>

                <GridItem sx={{ pt: 2 }}>
                  <FieldHeader title={"Upload image"} />
                  <Box
                    sx={{
                      border: "2px dashed #cccccc",
                      borderRadius: "8px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "200px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        {selectedImage && (
                          <img
                            alt="Selected"
                            height="160px"
                            src={URL.createObjectURL(selectedImage)}
                            style={{ position: "inherit" }}
                            width="80%"
                          />
                        )}
                        {!selectedImage && data && data.images.length > 0 && (
                          <img
                            alt="Selected"
                            height="160px"
                            src={
                              data.images[0].startsWith("/")
                                ? `http://localhost:5000${data.images[0]}`
                                : data.images[0]
                            }
                            style={{ position: "inherit" }}
                            width="80%"
                          />
                        )}
                      </Grid>
                      <Grid item xs={4}>
                        <TextField type="file" onChange={handleImageChange} />
                        {isImageUploading && (
                          <Box sx={{ pr: 2, pt: 0.5 }}>
                            <CircularProgress
                              size={16}
                              sx={{ color: "white" }}
                            />
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions sx={{ paddingRight: "24px", p: 4, py: 3, gap: 2 }}>
            <Button
              onClick={() => {
                dispatch(restore());
                handleClose();
              }}
              sx={{ width: 200, height: 42, borderRadius: "5px" }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              autoFocus
              disabled={!formValid || isLoading}
              onClick={() => formik.handleSubmit()}
              sx={{ width: 200, height: 42, borderRadius: "5px" }}
              type="submit"
              variant="contained"
            >
              {isLoading && (
                <Box sx={{ pr: 2, pt: 0.5 }}>
                  <CircularProgress size={16} sx={{ color: "white" }} />
                </Box>
              )}
              {data ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default NewPizzaProduct;

const GridItem = ({ ...rest }) => {
  return <Grid item key={1} lg={12} sm={12} xs={12} {...rest} />;
};
