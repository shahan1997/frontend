import { Box } from "@mui/material";
import "./App.css";
import { Header } from "./layouts/Header";
import AppRoutes from "./layouts/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import withAppProviders from "./withAppProviders";
import Footer from "./layouts/Footer";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Box data-testid="pos-ui-app">
      <MainLayout>
        <BrowserRouter>
          <Box>
            <Header data-testid="Header" />
            <AppRoutes />
            <Footer />
          </Box>
        </BrowserRouter>
      </MainLayout>
    </Box>
  );
}

export default withAppProviders(App)();
