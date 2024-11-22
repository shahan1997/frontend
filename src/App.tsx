import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./layouts/Header";
import AppRoutes from "./layouts/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import withAppProviders from "./withAppProviders";

function App() {
  return (
    <Box data-testid="pos-ui-app">
      <BrowserRouter>
        <Box>
          <Header data-testid="Header" />
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default withAppProviders(App)();
