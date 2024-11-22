import { TypographyOptions } from "@mui/material/styles/createTypography";
import { appColors } from "./appColors";
import { palette } from "./palette";

export const rem = (pixel: number) => {
  return `${pixel / 16}rem`;
};

export const typography: TypographyOptions = {
  fontFamily: "Satoshi, Helvetica, Arial, sans-serif",
  h1: {
    color: palette.text.primary,
    fontSize: rem(50),
    fontWeight: 200,
    lineHeight: 1.4,
    fontFamily: "Satoshi",
    textTransform: "uppercase",
  },
  h2: {
    color: palette.text.primary,
    fontFamily: "Satoshi",
    fontWeight: 300,
    fontSize: rem(48),
    lineHeight: 1.2,
  },
  h3: {
    color: palette.text.primary,
    fontSize: rem(40),
    lineHeight: 1.2,
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 900,
    fontSize: rem(36),
    lineHeight: 1.2,
  },
  h5: {
    color: palette.text.primary,
    fontFamily: "Satoshi",
    fontWeight: 300,
    fontSize: rem(28),
    lineHeight: 1.2,
    textTransform: "uppercase",
  },
  h6: {
    color: palette.text.primary,
    fontFamily: "Satoshi",
    fontWeight: 300,
    fontSize: rem(20),
    lineHeight: 1.3,
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: rem(14),
    fontFamily: "Satoshi",
    fontWeight: 300,
    lineHeight: "20px",
  },
  subtitle2: {
    color: palette.text.primary,
    fontSize: rem(12),
    fontFamily: "Satoshi",
    fontWeight: 300,
    lineHeight: 1.2,
  },
  body1: {
    color: palette.text.primary,
    fontSize: rem(16),
    fontFamily: "Satoshi",
    fontWeight: 300,
  },
  body2: {
    color: palette.text.primary,
    fontSize: rem(16),
    fontFamily: "Satoshi",
    fontWeight: "bold",
  },
  caption: {
    color: palette.text.secondary,
    fontSize: rem(10),
    fontFamily: "Satoshi",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: "16px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFeatureSettings: `'tnum' on, 'lnum' on`,
  },
  overline: {
    color: appColors.black[100],
    fontSize: rem(10),
    fontFamily: "Satoshi",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: "0.33px",
    lineHeight: "16px",
    textTransform: "uppercase",
  },
  button: {
    textTransform: "uppercase",
    fontFamily: "Satoshi",
    fontWeight: 900,
    fontSize: rem(12),
    letterSpacing: "1.5px",
    borderRadius: "0px",
  },
};
