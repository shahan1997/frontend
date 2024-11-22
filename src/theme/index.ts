import { createTheme } from "@mui/material";
import { appColors } from "./appColors";
import { rem, typography } from "./typography";
import { palette } from "./palette";

const sizeSmallPadding = `${rem(2)} ${rem(2)}`;
const sizeMediumPadding = `${rem(8)} ${rem(28)}`;
const sizeLargePadding = `${rem(12)} ${rem(28)}`;

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    hint: true;
    registerButton: true;
    cardSubtitle1: true;
    cardSubtitle2: true;
  }
}

export const theme = createTheme({
  palette,
  typography,
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "hint" },
          style: {
            fontSize: rem(10),
            fontFamily: "Satoshi",
            fontWeight: "normal",
            fontStyle: "normal",
          },
        },
        {
          props: { variant: "registerButton" },
          style: {
            fontColor: `solid ${palette.primary.dark}`,
            fontSize: "10px",
            fontFamily: "Satoshi",
            fontWeight: "bold",
          },
        },
        {
          props: { variant: "cardSubtitle1" },
          style: {
            display: "block",
            fontFamily: "Satoshi",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "20px",
            color: palette.text.secondary,
          },
        },
        {
          props: { variant: "cardSubtitle2" },
          style: {
            display: "block",
            fontFamily: "Satoshi",
            fontWeight: "300",
            fontSize: "14px",
            lineHeight: "20px",
            marginTop: "7px",
            color: palette.text.secondary,
          },
        },
      ],
    },
    MuiDivider: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiButton: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        root: {
          letterSpacing: 1,
          borderRadius: 0,
          padding: sizeMediumPadding,
        },
        containedPrimary: {
          border: `1px solid ${palette.primary.main}`,
          "&:disabled": {
            border: `1px solid ${palette.divider}`,
            backgroundColor: palette.action.disabled,
            color: palette.primary.contrastText,
          },
        },
        containedSecondary: {
          border: `1px solid ${palette.secondary.main}`,
          "&:disabled": {
            border: `1px solid ${palette.divider}`,
            backgroundColor: palette.action.disabled,
            color: palette.primary.contrastText,
          },
        },
        outlinedPrimary: {
          border: `1px solid ${palette.primary.main}`,
        },
        outlinedSecondary: {
          border: `1px solid ${palette.secondary.main}`,
        },
        containedSizeLarge: {
          padding: sizeLargePadding,
          minWidth: rem(166),
          minHeight: rem(50),
        },
        containedSizeSmall: {
          padding: sizeSmallPadding,
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: rem(12),
        },
        outlinedSizeLarge: {
          padding: sizeLargePadding,
          minWidth: rem(166),
          minHeight: rem(50),
        },
        outlinedSizeSmall: {
          padding: sizeSmallPadding,
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: rem(12),
        },
      },
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            textTransform: "none",
            border: `1px dashed ${palette.secondary.main}`,
          },
        },
        {
          props: { variant: "dashed", color: "secondary" },
          style: {
            border: `1px dashed ${palette.secondary.main}`,
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          maxWidth: "327px",
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          "& img": {
            float: "left",
            height: "40px",
            paddingLeft: "20px",
            maxWidth: "140px",
          },
          "& svg": {
            "@media (min-width:715px)": {
              display: "none",
            },
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiMenu: {
      defaultProps: {
        autoFocus: false,
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
          textTransform: "none",
          fontSize: rem(14),
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "primary",
      },
      styleOverrides: {
        colorPrimary: {
          color: palette.primary.light,
        },
        colorSecondary: {
          color: palette.secondary.light,
        },
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: appColors.black[100],
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
          borderBottom: `1px solid ${palette.divider}`,
          // padding:0
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          color: appColors.black[50],
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
        },
        displayedRows: {
          color: appColors.black[50],
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
        },
        input: {
          color: appColors.black[50],
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: rem(14),
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          fontFamily: "Satoshi",
          fontWeight: "normal",
          fontStyle: "normal",
          fontSize: rem(12),
          alignItems: "center",
        },
        action: {
          display: "flex",
          alignItems: "center",
          padding: 0,
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          fontSize: rem(12),
          borderRadius: 0,
          textTransform: "uppercase",
          borderColor: palette.primary.light,
          height: "26px",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          // marginTop: '20px',
          // width: '75%',
          marginLeft: "10px",
          // height: '34px',
          // objectFit: 'none'
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          display: "flex",
          "& .MuiDialog-container": {
            alignSelf: "flex-end",
            width: "100%",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          fontSize: 120,
        },
      },
    },
  },
});
