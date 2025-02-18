import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEnableAuth } from "../page/Login/store/AuthSelector";
import Login from "../page/Login";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAdmin = useSelector(selectEnableAuth);

  if (!isAdmin) {
    return <Login />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
