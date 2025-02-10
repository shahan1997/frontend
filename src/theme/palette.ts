/* eslint-disable linebreak-style */
import { appColors } from "./appColors";

export const palette = {
  background: {
    default: "#FFFFFF",
  },
  primary: {
    light: appColors.royalBlue[40],
    dark: appColors.royalBlue[100],
    main: appColors.royalBlue[100],
    contrastText: appColors.white,
  },
  secondary: {
    light: appColors.reflexBlue[40],
    dark: appColors.reflexBlue[100],
    main: appColors.reflexBlue[100],
    contrastText: appColors.white,
  },
  error: {
    light: appColors.carmineRed[40],
    dark: appColors.carmineRed[100],
    main: appColors.carmineRed[90],
    contrastText: appColors.white,
  },
  warning: {
    light: appColors.amberYellow[40],
    dark: appColors.amberYellow[100],
    main: appColors.amberYellow[90],
    contrastText: appColors.white,
  },
  info: {
    light: appColors.persianBlue[40],
    dark: appColors.persianBlue[100],
    main: appColors.persianBlue[90],
    contrastText: appColors.white,
  },
  success: {
    light: appColors.forestGreen[40],
    dark: appColors.forestGreen[100],
    main: appColors.forestGreen[90],
    contrastText: appColors.white,
  },
  text: {
    primary: appColors.black[100],
    secondary: appColors.black[80],
    disabled: appColors.black[50],
  },
  divider: appColors.black[20],
  action: {
    selected: appColors.forestGreen[20],
    hover: appColors.royalBlue[10],
    disabledBackground: appColors.black[20],
    disabled: appColors.black[30],
  },
};
