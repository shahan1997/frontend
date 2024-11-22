import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { appColors } from "../../../theme/appColors";
import { IProductData } from "../../../core/interface/api.interface";
import { getPriceFormatCodeToSymbol } from "../../../core/utils";

interface ReactTableProps {
  productData: IProductData[];
  onDelete: (product: IProductData) => void;
  onEdit: (product: IProductData) => void;
  onStar: (product: IProductData) => void;
  isStarred: boolean;
}

const ReactTable: React.FC<ReactTableProps> = ({
  productData,
  onDelete,
  onEdit,
  onStar,
  isStarred,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "20vh",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          pr: "20px",

          pl: "40px",
          // width: "90%",
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: appColors.blue,
                  borderBottom: "none",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: "25.65px",
                }}
              >
                SKU
              </TableCell>
              <TableCell
                sx={{
                  color: appColors.blue,
                  borderBottom: "none",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: "25.65px",
                }}
              >
                IMAGE
              </TableCell>
              <TableCell
                sx={{
                  color: appColors.blue,
                  borderBottom: "none",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: "25.65px",
                }}
              >
                PRODUCT NAME
              </TableCell>

              <TableCell
                sx={{
                  color: appColors.blue,
                  borderBottom: "none",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: "25.65px",
                }}
              >
                PRICE
              </TableCell>
              <TableCell
                sx={{
                  color: appColors.blue,
                  borderBottom: "none",
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: "25.65px",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((product) => (
              <TableRow key={product._id}>
                <TableCell
                  sx={{
                    color: appColors.grey,
                    fontSize: "19px",
                    fontWeight: 500,
                    lineHeight: "25.65px",
                  }}
                >
                  {product.sku}
                </TableCell>

                <TableCell
                  style={{
                    padding: "20px 0px 20px 0px",
                  }}
                >
                  <Card
                    sx={{
                      boxShadow: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`http://localhost:5000${
                        product.images.find((img) => img.isFeatured)?.url || ""
                      }`}
                      alt={product.name}
                      sx={{
                        width: 80,
                        borderRadius: 2,
                        height: 80,
                      }}
                    />
                  </Card>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    lineHeight: "25.65px",
                  }}
                >
                  {product.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "19px",
                    fontWeight: 500,
                    lineHeight: "25.65px",
                  }}
                >
                  {getPriceFormatCodeToSymbol(product.price)}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => onDelete(product)}
                    sx={{
                      color: appColors.blue,
                      "&:hover": {
                        backgroundColor: appColors.greyishBlue[20],
                      },
                    }}
                  >
                    <img
                      src={
                        require("../../../assets/images/delete-icon.svg")
                          .default
                      }
                      alt="Delete"
                      style={{ width: 24, height: 24 }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={(event) => onEdit(product)}
                    sx={{
                      color: appColors.blue,
                      "&:hover": {
                        backgroundColor: appColors.greyishBlue[20],
                      },
                    }}
                  >
                    <img
                      src={
                        require("../../../assets/images/edit-icon.svg").default
                      }
                      alt="Edit"
                      style={{ width: 24, height: 24 }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={(event) => onStar(product)}
                    sx={{
                      color: appColors.blue,
                      "&:hover": {
                        backgroundColor: appColors.greyishBlue[20],
                      },
                    }}
                  >
                    <img
                      src={
                        product.quantity > 30
                          ? require("../../../assets/images/star.svg").default
                          : require("../../../assets/images/starred.svg")
                              .default
                      }
                      alt="Star"
                      style={{ width: 24, height: 24 }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(ReactTable);
