/* eslint-disable react/display-name */
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Provider } from "react-redux";

import store from "./store";
import { theme } from "./theme";
import { NotifierProvider } from "./core/Notifier";
/**
 * Higher order function to wrap the application with redux store and other providers
 * @param {*} Component
 * @returns
 */
const withAppProviders =
  (Component: React.ComponentType) => (props?: object) => {
    return () => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NotifierProvider>
            <CssBaseline />
            <Component {...props} />
          </NotifierProvider>
        </ThemeProvider>
      </Provider>
    );
  };

export default withAppProviders;
