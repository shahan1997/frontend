// import { appColors } from "../theme/appColors";

import { appColors } from "../theme/appColors";

export const header = {
  height: "70px",
  "& header": {
    height: "70px",
    color: appColors.greyishBlue,
    background: appColors.white,
    boxShadow:
      "0px 3px 6px rgb(51 51 51 / 10%), 0px 1px 3px rgb(51 51 51 / 10%), 0px 2px 4px -1px rgb(51 51 51 / 5%)",
    //padding: '31px 64px 15px',
    paddingRight: "8px",
    justifyContent: "left",
    alignItem: "center",
    "& .MuiToolbar-root": {
      minHeight: "24px",
      height: "24px",
    },
  },
  "& .MuiToolbar-root ": {
    minHeight: "24px",
    height: "24px",
    padding: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (min-width: 600px)": {
      padding: "24px",
    },
    "& .MuiGrid-container": {
      marginTop: "0px",
      height: "24px",
      paddingTop: "2px",
      paddingBottom: "2px",
      "& .MuiGrid-item": {
        paddingTop: 0,
        "& p": {
          textTransform: "capitalize",
        },

        "& button": {
          //marginTop: '-8px',
        },
      },
      width: "fit-content",
    },
  },
};
