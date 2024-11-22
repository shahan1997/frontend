import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { appColors } from "../theme/appColors";

interface IDeletePopup {
  open: boolean;
  handleCloseDelete: (close: boolean) => void;
  onConfirm: () => Promise<void>;
  title: string;
  content: string;
}

const DeletePopup = ({
  open,
  handleCloseDelete,
  onConfirm,
  title,
  content,
}: IDeletePopup) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(["common"]);

  const onClose = () => {
    handleCloseDelete(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error while deleting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px",
          gap: "16px",
        },
      }}
    >
      {/* SVG Image at the top, centered */}
      <Box
        component="img"
        src={require("../../src/assets/images/alert.svg").default}
        alt="Delete Icon"
        sx={{ width: 60, height: 60, marginBottom: 2 }}
      />

      {/* Centered and bold title */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "24px",
          paddingBottom: 0,
        }}
      >
        {title}
      </DialogTitle>

      {/* Centered subtitle/content below the title */}
      <DialogContent
        sx={{
          textAlign: "center",
          paddingBottom: "16px",
        }}
      >
        <DialogContentText
          sx={{
            fontSize: "18px",
            color: "text.secondary",
          }}
        >
          {content}
        </DialogContentText>
      </DialogContent>

      {/* Centered buttons */}
      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            width: 200,
            height: 42,
            textTransform: "none",
            borderRadius: "5px",
            border: `2px solid ${appColors.blue}`,
            fontWeight: "bold",
          }}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          sx={{
            mb: 0,
            mr: 2,
            border: "none",
            backgroundColor: appColors.blue,
            textTransform: "none",
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
          autoFocus
          variant="outlined"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
