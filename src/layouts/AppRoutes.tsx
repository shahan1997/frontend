import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";

// Import the Product component lazily
const Product = React.lazy(() => import("../page/Product"));

/**
 * AppRoutes will load the app routes.
 * @returns
 */

const AppRoutes = () => {
  return (
    <Routes>
      {/* 
        The Product component is lazily loaded using Suspense.
        You can add other routes similarly if needed.
      */}

      {/* Default route - Redirect to /product */}
      <Route path="/" element={<Navigate to="/product" />} />
      <Route
        path="/product"
        element={
          <Suspense fallback={<Loader />}>
            <Product />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
