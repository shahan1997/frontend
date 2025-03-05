import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import ProtectedRoute from "./ProtectedRoute";

// Import the Product component lazily
const Dashboard = React.lazy(() => import("../page/Dashboard"));
const PizzaMenu = React.lazy(() => import("../page/Menu"));
const Card = React.lazy(() => import("../page/Card"));
const AdminCard = React.lazy(() => import("../page/AdminCard"));
const ContactForm = React.lazy(() => import("../page/ContactForm"));

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
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Navigate to="/dashboard" />
          </Suspense>
        }
      />

      <Route
        path="/menu"
        element={
          <Suspense fallback={<Loader />}>
            <PizzaMenu />
          </Suspense>
        }
      />
      <Route
        path="/contact-form"
        element={
          <Suspense fallback={<Loader />}>
            <ContactForm />
          </Suspense>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <AdminCard />
            </Suspense>{" "}
          </ProtectedRoute>
        }
      />

      <Route
        path="/card"
        element={
          <Suspense fallback={<Loader />}>
            <Card />
          </Suspense>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
